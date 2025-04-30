'use server';

import { deleteFile, uploadFile } from "../cloudinary";
import { connectToDB } from "../db";
import { SiteLogo } from "../model/siteLogo.model";
import { errorResponse, successResponse } from "../utils";

export const createSiteLogo = async (formData: FormData) => {
    const {position, description, image} = Object.fromEntries(formData);
    try {
        await connectToDB();
        const img = {
            secure_url: "",
            public_key: ""
        }

        if(image instanceof File && image.size > 0) {
            const resp: any = await uploadFile(image, 'image')
            console.log(resp);
            img.secure_url = resp.secure_url;
            img.public_key = resp.public_id;
        }

        const newItem = new SiteLogo({
            position,
            description,
            image_url: img.secure_url,
            image_id: img.public_key
        })
        await newItem.save();

        return successResponse(201, "Created successfully");
        
    } catch (error) {
        console.log(error);
        return errorResponse();
    }
}


export const updateSiteInfos = async (formData: FormData) => {
    try {
        await connectToDB();
    } catch (error) {
        console.log(error);
    }
}


export const getSiteInfos = async () => {
    try {
        await connectToDB();
        const resp = await SiteLogo.find().lean();

        return successResponse(200, "successfull", resp);
    } catch (error) {
        console.log(error);
        return errorResponse();
    }
}

export const deleteSiteInfo = async (id: string) => {

    try {
        await connectToDB();
        const resp = await SiteLogo.findByIdAndDelete(id);
        if(resp.image_id) {
            await deleteFile(resp.image_id);
        }
        return successResponse(204, "Deleted successfully");
    } catch (error) {
        console.log(error);
        return errorResponse();
    }
}


export const getHeader = async () => {
    try {
        await connectToDB();
        const resp = await SiteLogo.findOne({position: 'Header'});
        return resp;
    } catch (error) {
        console.log(error);
    }
}

export const getFooter = async () => {

    try {
        await connectToDB();
        const resp = await SiteLogo.findOne({position: 'Footer'});
        return resp;
    } catch (error) {
        console.log(error);
    }
}

getFooter();