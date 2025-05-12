'use server';

import { auth, signIn, signOut } from "../auth";
import { ITEM_PER_PAGE } from "../constant";
import { connectToDB } from "../db";
import { User } from "../model/user.model";
import { errorResponse, loginSchema, registerSchema, successResponse } from "../utils";
import bcrypt from "bcryptjs";


export const isAuthenticated = async () => {
    const resp = await auth();
    console.log("auth inside:", resp);
    return !!resp;
}

export const isAdmin = async () => {
    const resp = await auth();
    return resp?.user.role === 'ADMIN';
}


export const logout = async () => {
        'use server';
        await signOut({redirectTo: '/'})
    }

export const doCredentialLogin = async (formData: FormData) => {
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        const validated = loginSchema.safeParse({
            email,
            password
        })
        if(!validated.success) {
            const errors = validated.error.flatten().fieldErrors;
            return errorResponse("Field Errors", 422, errors);
        }
        await signIn('credentials', {
            email,
            password,
            redirect: false
        })
        return successResponse(200,"Login Successfull")
    } catch (error) {
        console.log(error);
        return errorResponse("Wrong Credentials, check your email and password", 404);
    }
}

export const createUser = async (formData: FormData) => {
    const {name, email, password, role} = Object.fromEntries(formData);
    try {
        await connectToDB();
        const exist = await User.findOne({email});
        if(exist) {
            return errorResponse("E-mail has already been used", 409);
        }
        const validated = registerSchema.safeParse({
            name,
            email,
            password
        });
        if(!validated.success) {
            const errors = validated.error.flatten().fieldErrors;
            return errorResponse("Field Errors", 422, errors)
        }
        const hashPassword = await bcrypt.hash(validated.data.password, 10);
        const user = new User({
            name: validated.data.name,
            email: validated.data.email,
            password: hashPassword,
            role: role ? role : 'USER'
        });
        await user.save();
        return role ? successResponse(201, `User created successfullly ${role === 'ADMIN' ? 'as Admin' : ""}`) : successResponse(201, "Registered successfully");
    } catch (error) {
        console.log(error);
        return errorResponse();
    }
}



export const getUsers = async (q: string, page: number) => {
    const regex = new RegExp(q, 'i');
    try {
        await connectToDB();
        const count = await User.find({name: { $regex: regex }}).countDocuments();
        const resp = await User.find({name: { $regex: regex }}).limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE*(page-1)).sort({createdAt: -1})

        return successResponse(200, "fetched successfully", resp, count);
    } catch (error) {
        console.log(error);
        return errorResponse();
    }
}


export const deleteUser = async (id: string) => {

    try {
        await connectToDB();
        await User.findByIdAndDelete(id);
        return successResponse(204, "User deleted successfully");
    } catch (error) {
        console.log(error);
        return errorResponse();
    }
}