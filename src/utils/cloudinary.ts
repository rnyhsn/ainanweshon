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



// export const uploadFile = async (file: File, folder="") => {

//     const arrayBuffer = await file.arrayBuffer();
//     const bytes = Buffer.from(arrayBuffer);
    
//     const extension = file.name.split('.').pop()?.toLowerCase() || "";
//     const originalName = file.name.replace(/\.[^/.]+$/, "");
//     const isImage = ['jpg', 'jpeg', 'png', 'webp'].includes(extension);
//     const uniqueName = `${originalName}-${(Math.random()*1000000).toString(16)}${ isImage ? "" : `.${extension}`}`;
//     const resource_type = isImage ? "image" : "raw";
//     return new Promise(async (resolve, reject) => {
//         await cloudinary.uploader.upload_stream({
//             resource_type,
//             folder: `ainanweshon/${folder}`,
//             public_id: `${uniqueName}`,
//             use_filename: false,
//             unique_filename: false,
//             overwrite: true
//         }, async (error, result) => {
//             if(error) {
//                 reject(error);
//             } else {
//                 resolve(result);
//             }
//         }).end(bytes);
//     })
// }

//     const buffer = Buffer.from(await file.arrayBuffer());
//     const extension = file.name.split(".").pop()?.toLowerCase() || "";
//     const isImage   = ["jpg","jpeg","png","webp"].includes(extension);
//     const publicId  = `${file.name.replace(/\.[^/.]+$/,"")}-${Date.now().toString(16)}`;
//     const resource  = isImage ? "image" : "raw";

//     return new Promise((resolve, reject) => {
//         const stream = cloudinary.uploader.upload_stream(
//         { resource_type: resource, folder: `ainanweshon/${folder}`, public_id: publicId },
//         (err, result) => err ? reject(err) : resolve(result)
//         );
//         Readable.from(buffer).pipe(stream);
//     });
// }


// function toDataUri(mime: string, buffer: Buffer) {
//     return `data:${mime};base64,${buffer.toString("base64")}`;
//   }


//   export const uploadFile = async (file: File, folder = "") => {
//     // 1) turn your File into a Buffer
//     const arrayBuffer = await file.arrayBuffer();
//     const buffer      = Buffer.from(arrayBuffer);
  
//     // 2) make a data URI
//     const dataUri = toDataUri(file.type, buffer);
  
//     // 3) choose public_id, folder, and auto-detect resource type
//     const opts = {
//       resource_type: "auto" as const,
//       folder:        `ainanweshon/${folder}`,
//       public_id:     file.name.replace(/\.[^/.]+$/, "") + "-" + Date.now().toString(16),
//       overwrite:     true,
//     };
  
//     // 4) upload and return the result
//     return cloudinary.uploader.upload(dataUri, opts);
//   };


// export const uploadFile = async (file: File, folder = "") => {
//     const buf       = Buffer.from(await file.arrayBuffer());
//     const mime      = file.type;                                // e.g. "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//     const extension = mime.split("/")[1];                       // "vnd.openxmlformats-officedocument.wordprocessingml.document"
//     // or more robustly:
//     // const extension = file.name.split(".").pop();
  
//     const isImage      = mime.startsWith("image/");
//     const resourceType = isImage ? "image" : "raw";
  
//     // Build public_id with extension for raw files:
//     const baseId = `${file.name.replace(/\.[^/.]+$/, "")}-${Date.now().toString(16)}`;
//     const publicId = resourceType === "raw"
//       ? `${baseId}.${extension}`    // e.g. "mydoc-abc123.docx"
//       : baseId;
  
//     const opts = {
//       resource_type: resourceType as "image" | "raw",
//       folder:        `ainanweshon/${folder}`,
//       public_id:     publicId,
//       overwrite:     true,
//     };
  
//     // Upload via data URI (works for both image & docx)
//     const dataUri = toDataUri(mime, buf);
//     return cloudinary.uploader.upload(dataUri, opts);
//   };




// export const deleteFile = async (publicId: string, file=false) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const resp = await cloudinary.uploader.destroy(publicId, {
//                 resource_type: file ? 'raw' : 'image'
//             });
//             resolve(resp);
//         } catch (error) {
//             reject(error);
//         }
//     })
// }


export async function deleteFile(publicId: string, raw = false) {
    return cloudinary.uploader.destroy(publicId, {
      resource_type: raw ? "raw" : "image"
    });
}