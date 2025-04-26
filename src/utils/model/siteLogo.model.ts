import mongoose from "mongoose";


export const siteLogoSchema = new mongoose.Schema({
    position: String,
    description: String,
    image_url: String,
    image_id: String
});


export const SiteLogo = mongoose.models.SiteLogo || mongoose.model('SiteLogo', siteLogoSchema);