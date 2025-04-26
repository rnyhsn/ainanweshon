import mongoose from "mongoose";


const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    slug: {
        type: String,
        required: true 
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: null
    }
}, {timestamps: true});


export const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);