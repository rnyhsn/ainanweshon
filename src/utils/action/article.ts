'use server';


import { deleteFile, uploadFile } from "../cloudinary";
import { connectToDB } from "../db";
import { Article } from "../model/article.model";
import { Category } from "../model/category.model";
import { articleSchema, errorResponse, slugify, successResponse } from "../utils";
import { ITEM_PER_PAGE } from "../constant";


export const createArticle = async (formData: FormData, categories?: {name: string, _id: string}[] , tags?: string[], attachedAuthors?: Record<string, string>[]) => {
    const {
        firstName,
        lastName,
        email,
        title,
        gender,
        phone,
        address,
        articleTitle,
        articleType,
        content,
        publishStatus,
    } = Object.fromEntries(formData);
    
    const image = formData.get('image')
    try {
        const categoryIds = categories?.map((category) => category._id);
        const slug = slugify(articleTitle.toString());
        const validated = articleSchema.safeParse({
            firstName,
            lastName,
            email,
            title,
            gender,
            articleTitle,
            slug,
            articleType,
            categories: categoryIds
        })
    
        if(!validated.success) {
            const errors = validated.error.flatten().fieldErrors
            return errorResponse("Some Errors", 400, errors);
        }

        let uploadImg = {
            public_key: "",
            secured_url: ""
        }

        if(image instanceof File) {
            if(image.size < 1) {
                return errorResponse("Image Field must not be empty");
            }
            if(image.size > 2*1024*1024) {
                return errorResponse("Image Size must not exceed 2MB. Compress it or try another one", 401);
            }

            const resp: any = await uploadFile(image, 'image');
            uploadImg.public_key = resp.public_id;
            uploadImg.secured_url = resp.secure_url
            
        }
        
        const article = new Article({
            firstName: validated.data.firstName,
            lastName: validated.data.lastName,
            title: validated.data.title,
            gender: validated.data.gender,
            email: validated.data.email,
            phone,
            address,
            image_url: uploadImg.secured_url,
            image_public_key: uploadImg.public_key,
            articleTitle: validated.data.articleTitle,
            slug: validated.data.slug,
            articleType: validated.data.articleType,
            categories: validated.data.categories,
            content,
            tags,
            publishStatus,
            attachedAuthors
        });
        await article.save();
       
        return successResponse(201, "Article created successfully");
    } catch (error) {
        console.log(error);
        return errorResponse();
    }
}


export const createArticleFromFrontend = async (formData: FormData, attachedAuthors?: Record<string, string>[]) => {
    const {
        firstName, lastName, title, gender, email, phone, address, image, articleTitle, articleType, category, tags, file
    } = Object.fromEntries(formData);
    try {
        
        /// validated fields
        const slug = slugify(articleTitle.toString());
        const validated = articleSchema.safeParse({
            firstName,
            lastName,
            title,
            gender,
            email,
            articleTitle,
            slug,
            articleType,
            categories: [category] 
        })


        if(!validated.success) {
            const error = validated.error.flatten().fieldErrors;
            return errorResponse("Some Error", 401, error);
        }

        /// image and file processing
        let error = {
            img: "",
            file: ""
        }

        if(image instanceof File && image.size < 1) {
            error.img = "Author image is required"
        }
        if(file instanceof File && file.size < 1 && !file.name.endsWith('.docx')) {
            error.file = "File is required and must be docx(ws word) file";
        }

        if(error.img || error.file) {
            return errorResponse("image related error", 400, error);
        }
        
        // upload file to the cloudinary
        let uploadedFile = {
            url: "",
            public_key: ""
        }
        let uploadedImg = {
            url: "",
            public_key: ""
        }

        const imgResp: any = await uploadFile(image as File, 'image')
        const fileResp: any = await uploadFile(file as File, "file");

        uploadedImg.url = imgResp.secure_url;
        uploadedImg.public_key = imgResp.public_id
        uploadedFile.url = fileResp.secure_url;
        uploadedFile.public_key = fileResp.public_id


        /// processing article tags
        let addedTags = tags.toString().split(",").map(tag => tag.trim()); 
        addedTags[addedTags.length-1] === '' && addedTags.pop();

        
        const article = new Article({
            firstName: validated.data.firstName,
            lastName: validated.data.lastName,
            title: validated.data.title,
            gender: validated.data.gender,
            email: validated.data.email,
            articleTitle: validated.data.articleTitle,
            slug: validated.data.slug,
            articleType: validated.data.articleType,
            categories: validated.data.categories,
            phone,
            address,
            tags: addedTags,
            image_url: uploadedImg.url,
            image_public_key: uploadedImg.public_key,
            file_url: uploadedFile.url,
            file_public_key: uploadedFile.public_key,
            attachedAuthors
        })

        // save the article
        await article.save();
        return successResponse(201, "Your article is on Review");
    } catch (error) {
        console.log(error);
        return errorResponse();
    }
}


export const getArticles = async (q: string, page: number) => {
    const regex = new RegExp(q, 'i');
    
    try {
        await connectToDB();
        const count = await Article.find({articleTitle: {$regex: regex}}).countDocuments();
        const resp = await Article.find({articleTitle: {$regex: regex}}).limit(ITEM_PER_PAGE).skip((page-1)*ITEM_PER_PAGE).sort({createdAt: -1}).populate('categories').lean();
        // if(resp.length === 0) {
        //     return successResponse(404, "Article List Empty");
        // }
        return successResponse(400, "Successfull", resp, count);
    } catch (error) {
        console.log(error);
        return errorResponse();
    }
}




export const getArticlesByQuery = async (query: string) => {
    const regex = new RegExp(query, 'i');
    try {
        const resp = await Article.find({
            $or: [
                {articleTitle: regex},
                {
                    tags: regex
                }
            ]
        }).lean();
        const articles = resp.map(article => ({...article, _id: String((article._id))}));
        return articles;
        
    } catch (error) {
        console.log(error);
    }
}



export const getArticle = async (id: string) => {

    try {
        await connectToDB();
        const resp: any = await Article.findById(id).lean().select('-__v -updatedAt').populate({
            path: 'categories',
            select: 'name slug _id'
        })

        if(!resp) {
            return errorResponse("Article Not Found", 404);
        }

        const article = {
            ...resp,
            _id: resp._id ? resp._id.toString() : "",
            categories: resp.categories?.map((cat: any) => ({...cat, _id: cat._id.toString()})),
            attachedAuthors: resp.attachedAuthors?.length > 0 ? resp.attachedAuthors.map((author: any) => ({...author, _id: author._id.toString()})) : []
        }

        return successResponse(200, "fetched successfull", article);
    } catch (error) {
        console.log(error);
        return errorResponse();
    }
}



export const getArticleBySlug = async (s: string) => {
    const slug = decodeURIComponent(s);

    try {
        await connectToDB();
        const resp = await Article.findOne({slug, publishStatus: 'PUBLISHED'});
        
        if(!resp) {
            return errorResponse("Article not Found", 404);
        }
        return successResponse(200, "fetched", resp);
    } catch (error) {
        console.log(error);
        return errorResponse();
    }
}



export const deleteArticle = async (id: string) => {

    try {
        await connectToDB();
        const resp = await Article.findByIdAndDelete(id);
        
        if(resp.image_public_key) {
            const res = await deleteFile(resp.image_public_key);
            console.log(res);
        }
        if(resp.file_public_key) {
            await deleteFile(resp.file_public_key, true);
        }
        return successResponse(204, "Article deleted successfully");
    } catch (error) {
        console.log(error);
        return errorResponse();
    }    
}



export const getArticleByCategory = async (slug: string, limit?: number) => {

    try {
      
        // return slug;
        const category = await Category.findOne({slug});
        if(category) {
            
            const resp = limit ?  await Article.find({categories: {$in : [category._id]}, publishStatus: 'PUBLISHED' }).limit(limit).sort({createdAt: -1}) : await Article.find({categories: {$in : [category._id]}, publishStatus: 'PUBLISHED' }).sort({createdAt: -1});

            return successResponse(200, "SuccessFull", resp);
        } else {
            return errorResponse("No Article Found", 404);
        }
    } catch (error) {
        console.log(error);
        return errorResponse();
    }
}






export const updateArticle = async (formData: FormData, categories?: string[], tags?: string[], authors?: Record<string, string>[]) => {
    const {id, firstName, lastName, email, title, gender, phone, address, articleType, articleTitle, slug, content, publishStatus, fileDelete} = Object.fromEntries(formData);

    const file = formData.get('image') as File;
    try {
        await connectToDB();
        const exist = await Article.findById(id);
        if(!exist) {
            return errorResponse("Article Not Found", 404);
        }
        const updatedCats = categories?.map((cat: any) => cat._id );
        
        const validated = articleSchema.safeParse({
            firstName,
            lastName,
            title,
            email,
            gender,
            articleTitle,
            slug,
            articleType,
            categories: updatedCats
        })
        if(!validated.success) {
            const errors = validated.error.flatten().fieldErrors;
            return errorResponse("Fields Errors", 400, errors);
        }

        /// update image 
        let uploadImg = {
            public_key: "",
            secured_url: ""
        };

        if(file instanceof File && file.size > 0) {
            const imgResp: any = await uploadFile(file, 'image');
            uploadImg.public_key = imgResp.public_id;
            uploadImg.secured_url = imgResp.secure_url
        }

            /// delete the attached file and Image
            if(uploadImg.public_key && uploadImg.secured_url) {
                await deleteFile(exist.image_public_key);
            }
            if(fileDelete === 'on') {
                await deleteFile(exist.file_public_key, true);
            }
    
           
        const updatedFields = {
                firstName: validated.data.firstName,
                lastName: validated.data.lastName,
                email: validated.data.email,
                gender: validated.data.gender,
                title: validated.data.title,
                articleTitle: validated.data.articleTitle,
                slug: validated.data.slug,
                articleType: validated.data.articleType,
                categories: validated.data.categories,
                image_url: uploadImg.secured_url || exist?.image_url,
                image_public_key: uploadImg.public_key || exist?.image_url,
                phone,
                address,
                content,
                tags,
                attachedAuthors: authors,
                publishStatus,
                file_url: fileDelete === 'on' ? "" : exist?.file_url,
                file_public_key: fileDelete === 'on' ? "" : exist?.file_public_key
            }
        

        const resp: any = await Article.findByIdAndUpdate(id, updatedFields);

        if(!resp) {
            return errorResponse("Article Not Found", 404);
        }


    
        return successResponse(201, "Article Updated successfully");

    } catch (error) {
        console.log(error);
        return errorResponse();
    }
}


export const getSidebarLatest = async () => {

    try {
        await connectToDB();
        const articles = await Article.find({publishStatus: 'PUBLISHED'}).limit(10);

        // return successResponse(200, "Fetched", resp);
        const result = articles.map((art) => ({articleTitle: art.articleTitle, slug: art.slug, image: art.image_url}))
        return result;
    } catch (error) {
        console.log(error);
        
    }
}

export const getSidebarPopular = async () => {
    try {
        const resp = await Category.findOne({slug: 'জনপ্রিয়'});
        const articles = await Article.find({categories: {$in : [resp._id]}, publishStatus: 'PUBLISHED'}).limit(10).sort({createdAt: -1});
        // console.log(articles);
        const result: any = articles.map((art) => ({articleTitle: art.articleTitle, slug: art.slug, image: art.image_url}));
        return result;
    } catch (error) {
        console.log(error);
    }
}




export const getArticlesByCategorySlug = async (slug: string) => {
    const decodedSlug = decodeURIComponent(slug);
    try {
        await connectToDB();
        const cat = await Category.findOne({slug: decodedSlug});
        const cats = await Category.find({$or : [{_id: cat._id}, {parent: cat._id}]});
        // console.log("Category: ", resp);
        const catsId = cats.map((cat) => cat._id);
       
        const articles = await Article.find({categories: {$in: catsId}, publishStatus: "PUBLISHED"}).sort({createdAt: -1});

        return successResponse(200, cat.name , articles);
        
    } catch (error) {
        console.log(error);
        return errorResponse();
    }
}



export const findArticlesByTags = async (tag: string) => {
    const regex = new RegExp(tag, 'i');
    try {
        await connectToDB();
        const resp = await Article.find({$or: [{$tags: {$in: [tag]}}, { $regex: {slug: regex} }]});
        console.log(resp);
    } catch (error) {
        console.log(error);
        return errorResponse();
    }
}