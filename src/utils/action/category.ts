'use server';
import { connectToDB } from "../db";
import { Category } from "../model/category.model";
import { errorResponse, slugify, successResponse } from "../utils";


export const createCategory = async (formData: FormData) => {
    const name = formData.get('name') as string;
    const parent = formData.get('parent');
    
    try {
        await connectToDB();
        if(name.trim() === "") {
            return errorResponse("Field must not be empty", 422);
        }
        const exist = await Category.findOne({name});
        if(exist) {
            return errorResponse("Category already exists", 409)
        }
        const category = new Category({
            name,
            slug: slugify(name),
            parent: parent || null
        })
        await category.save();
        return successResponse(201, "Category created successfully");
    } catch (error) {
        console.log(error);
        return errorResponse();
    }
}


export const getCategories = async () => {
    
    try {
        await connectToDB();
        const resp = await Category.find().populate('parent').sort({createdAt: -1}).lean();
        if(resp.length === 0) {
            return successResponse(204, "No Category Added");
        }
        const category = resp.map((cat) => ({...cat, _id: String(cat._id), parent: cat.parent ? {name: cat.parent.name, _id: String(cat.parent._id)} : null }))
        return successResponse(200,'success', category);
    } catch (error) {
        console.log(error);
        return errorResponse();
    }
}

export const getCategoryById = async (id: string) => {
    try {
        await connectToDB();
        const resp: any = await Category.findById(id).populate('parent').lean();
       
        if(!resp) {
            return errorResponse("Category Not Found", 404);
        }
        const category = {...resp, _id: resp._id.toString(), parent: resp.parent ? {name: resp.parent.name, _id: resp.parent._id.toString()} : null};
        return successResponse(200, "Success", category);
    } catch (error) {
        console.log(error);
        return errorResponse();
    }
}


export const updateCategory = async (formData: FormData) => {
    const {id, name, slug, parent} = Object.fromEntries(formData); 
    try {
        await connectToDB();
        const cat = {name, slug, parent: parent || null};
        if(name.toString().trim().length === 0) {
            return errorResponse("Field must not be empty", 422);
        }
        await Category.findByIdAndUpdate(id, cat);
        
        return successResponse(204, "Category Updated successfully");
    } catch (error) {
        console.log(error);
        return errorResponse();
    }
}


export const deleteCategory = async (id: string) => {

    try {
        await connectToDB();
        await Category.findByIdAndDelete(id);
        
        return successResponse(204, "Category deleted successfully");
    } catch (error) {
        return errorResponse();
    }
}



export const getHeaderCategories = async () => {

    try {
        await connectToDB();
        const parents = await Category.find({parent: null});
        const childrenWithParent = await Promise.all(parents.map(async parent => {
            const children = await Category.find({parent: parent._id})

            return {
                ...parent.toObject(),
                children
            }
        }))
        return successResponse(200, "Successfull", childrenWithParent);
    } catch (error) {
        console.log(error);
        return errorResponse();
    }
}


