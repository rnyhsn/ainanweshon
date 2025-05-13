'use server';

import { connectToDB } from "../db";
import { Comment } from "../model/comment.model";
import { commentSchema, errorResponse, successResponse } from "../utils";


export const createComment = async (formData: FormData) => {
    const {article, name, email, website, comment} = Object.fromEntries(formData);
    
    
    try {
        await connectToDB();
        const validated = commentSchema.safeParse({name, email, comment})
        if(!validated.success) {
            const errors = validated.error.flatten().fieldErrors;
            return errorResponse("Field errors", 400, errors);
        }
        const newComment = new Comment({
            article,
            name: validated.data.name,
            email: validated.data.email,
            website,
            comment
        })
        await newComment.save();
        return successResponse(201, 'Thank you for commenting');
    } catch (error) {
        console.log(error);
        return errorResponse();
    }
}


export const getComments = async () => {
    try {
        await connectToDB();
        const resp = await Comment.find().lean();

        return successResponse(200, "successfull", resp);
    } catch (error) {
        console.log(error);
        return errorResponse();
    }
}

export const getArticleComments = async (id: string) => {
    try {
        const comments = await Comment.find({article: id, publishStatus: 'PUBLISHED'});
        console.log(comments);
        return successResponse(200, "fetched", comments);
    } catch (error) {
        console.log(error);
        return errorResponse();
    }
}


export const getComment = async (id: string) => {

    try {
        await connectToDB();
        const resp = await Comment.findById(id).populate('article');
        if(!resp) {
            return errorResponse("Comment Not Found", 404);
        }
        const comment = {
            _id: String(resp._id),
            name: resp.name,
            email: resp.email,
            website: resp.website,
            comment: resp.comment,
            publishStatus: resp.publishStatus,
            article: {
                articleTitle: resp.article.articleTitle,
                _id: String(resp.article._id),
            }
        }
        
        return successResponse(200, "", [comment]);
    } catch (error) {
        console.log(error);
        return errorResponse();
    }
}

export const updateComment = async (formData: FormData, id: string) => {
    const {article, name, email, website, comment, publishStatus} = Object.fromEntries(formData);
    try {
        await connectToDB();
        const validated = commentSchema.safeParse({name, email, comment, publishStatus})
        if(!validated.success) {
            const errors = validated.error.flatten().fieldErrors;
            return errorResponse("Field errors", 400, errors);
        }
        const updatedField = {
            article,
            name: validated.data.name,
            email: validated.data.email,
            website,
            comment,
            publishStatus
        };

        await Comment.findByIdAndUpdate(id, updatedField);
        return successResponse(201, "Comment updated");
    } catch (error) {
        console.log(error);
        return errorResponse();
    }
}


export const deleteComment = async (id: string) => {

    try {
        await connectToDB();
        const comment = await Comment.findByIdAndDelete(id);
        if(comment) {
            return successResponse(204, "Comment deleted");
        }
    } catch (error) {
        console.log(error);
        return errorResponse();
    }
}