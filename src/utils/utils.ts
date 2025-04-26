import { Types } from 'mongoose';
import { IconType } from 'react-icons';
import { z } from 'zod';


export const slugify = (text: string) => {
    return text.replaceAll(" ", "-");
}

/// ============================================> TypeScripts Type Sections Starts ================================>
export interface IMenu {
    title: string,
    path: string,
    icon: IconType
}

// export interface ICategory {
//     name: string,
//     slug: string,
//     parent?: string,
//     children?: ICategory[]
// }





/// ============================================> TypeScripts Type Sections Ends ================================>





/// ==============================================> Server Response Functions Starts =================================>
export const successResponse = (statusCode=200, message="Success", payload?: any[], count = 0) => {

    return {
        success: true,
        statusCode,
        message,
        payload,
        count
    }
}

export const errorResponse = (message="Something went wrong", statusCode=500, payload?: any) => {

    return {
        success: false,
        statusCode,
        message,
        payload
    }
}


/// ==============================================> Server Response Functions Ends =================================>






/// ===========================================> Database Validation Sections Starts ===================================>
export const articleSchema = z.object({
    firstName: z.string().nonempty("First Name is Required").min(3, "First Name must be at least 3 characters"),
    lastName: z.string().nonempty("Last Name is Required").min(3, "Last Name must be at least 3 characters"),
    email: z.string().nonempty("Email is Required").email("Invalid Email"),
    title: z.string().nonempty("Title is required"),
    gender: z.string().nonempty("Gender is Required"),
    articleTitle: z.string().nonempty("Article Title is Required"),
    slug: z.string().nonempty("Article Slug is required"),
    articleType: z.string().nonempty("Article Type is Required"),
    categories: z.string().nonempty("Category is required").array()
})

export const registerSchema = z.object({
    name: z.string().nonempty("Name is Required").min(5, "Name must be at least 5 characters"),
    email: z.string().nonempty("E-mail is required").email("Invalid Email"),
    password: z.string().nonempty("Password is required").min(6, "Password must be at least 6 characters")
})

export const loginSchema = z.object({
    email: z.string().nonempty("E-mail is required").email("Invalid Email"),
    password: z.string().nonempty("Password is required")
})

export const commentSchema = z.object({
    name: z.string().nonempty("Name is required"),
    email: z.string().nonempty("E-mail is required").email("Invalid E-mail"),
    comment: z.string().nonempty("This field is required")
})

///=============================================> Database Validation Sections Ends ====================================>



/// ============================================> Sites Static Data Starts ===========================================>
export const authorTitles = [
    'MR.',
    'MRS.',
    'MS.',
    'MX.',
    'DR.',
    'LAWYER',
    'JUDGE',
    'PROF.'
]
export const genderOptions = [
    'MALE',
    'FEMALE',
    'OTHERS'
]
export const articleTypes = [
    'ARTICLE',
    'BLOG',
    'BOOK REVIEW',
    'ESSAY',
    'CASE LAW',
    'FORUM'
]
export const publishStatus = ['PENDING', 'PUBLISHED']
export const roles = ['USER', 'ADMIN'];
/// ==============================================> Site Static Data Ends ============================================>