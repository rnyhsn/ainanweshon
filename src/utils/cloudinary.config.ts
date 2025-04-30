import type { v2 as CloudinaryV2 } from 'cloudinary';

const cloudinary: typeof CloudinaryV2 = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET 
})


export default cloudinary;
