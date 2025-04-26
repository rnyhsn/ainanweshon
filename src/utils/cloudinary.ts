import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET 
})




export const uploadFile = async (file: File, folder="") => {

    const arrayBuffer = await file.arrayBuffer();
    const bytes = Buffer.from(arrayBuffer);
    
    const extension = file.name.split('.').pop()?.toLowerCase() || "";
    const originalName = file.name.replace(/\.[^/.]+$/, "");
    const isImage = ['jpg', 'jpeg', 'png', 'webp'].includes(extension);
    const uniqueName = `${originalName}-${(Math.random()*1000000).toString(16)}${ isImage ? "" : `.${extension}`}`;
    const resource_type = isImage ? "image" : "raw";
    return new Promise(async (resolve, reject) => {
        await cloudinary.uploader.upload_stream({
            resource_type,
            folder: `ainanweshon/${folder}`,
            public_id: `${uniqueName}`,
            use_filename: false,
            unique_filename: false,
            overwrite: true
        }, async (error, result) => {
            if(error) {
                reject(error);
            } else {
                resolve(result);
            }
        }).end(bytes);
    })
}


export const deleteFile = async (publicId: string, file=false) => {
    return new Promise(async (resolve, reject) => {
        try {
            const resp = await cloudinary.uploader.destroy(publicId, {
                resource_type: file ? 'raw' : 'image'
            });
            resolve(resp);
        } catch (error) {
            reject(error);
        }
    })
}