import mongoose from 'mongoose';
import { articleTypes, authorTitles, genderOptions, publishStatus } from '../utils';

const articleSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    title: {
        type: String,
        enum: authorTitles
    },
    gender: {
        type: String,
        enum: genderOptions 
    },
    phone: String,
    address: String,
    image_url: String,
    image_public_key: String,
    articleTitle: {
        type: String,
        unique: true,
        required: true
    },
    slug: {
        type: String,
        unique: true,
        required: true
    },
    articleType: {
        type: String,
        enum: articleTypes
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
    content: String,
    tags: [String],
    publishStatus: {
        type: String,
        enum: publishStatus,
        default: 'PENDING',
    },
    file_url: String,
    file_public_key: String,
    attachedAuthors: [{
        firstName: String,
        lastName: String,
        email: String,
        title: String
    }]
}, {timestamps: true});


export const Article = mongoose.models.Article || mongoose.model('Article', articleSchema);