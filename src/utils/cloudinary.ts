import { Readable } from 'stream';
import cloudinary from './cloudinary.config';



export async function uploadFile(file: File, folder = "") {
    const arrayBuffer = await file.arrayBuffer();
    const bytes       = Buffer.from(arrayBuffer);
  
    const extension    = file.name.split(".").pop()?.toLowerCase() || "";
    const originalName = file.name.replace(/\.[^/.]+$/, "");
    const isImage      = ["jpg","jpeg","png","webp"].includes(extension);
    // uniqueName includes the extension for raw files:
    const uniqueName   = `${originalName}-${(Math.random()*1e6).toString(16)}${isImage ? "" : `.${extension}`}`;
    const resource_type = isImage ? "image" : "raw";
  
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({
        resource_type,
        folder:        `ainanweshon/${folder}`,
        public_id:     uniqueName,
        use_filename:  false,
        unique_filename: false,
        overwrite:     true
      }, (error, result) => {
        if (error) reject(error);
        else        resolve(result);
      });
      Readable.from(bytes).pipe(stream);
    });
  }



export async function deleteFile(publicId: string, raw = false) {
    return cloudinary.uploader.destroy(publicId, {
      resource_type: raw ? "raw" : "image"
    });
}