import mongoose from "mongoose";
import { publishStatus } from "../utils";


export const commentSchema = new mongoose.Schema({
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    },
    name: String,
    email: String,
    website: String,
    comment: String,
    publishStatus: {
        type: String,
        enum: publishStatus,
        default: 'PENDING'
    }
}, {timestamps: true});


export const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);