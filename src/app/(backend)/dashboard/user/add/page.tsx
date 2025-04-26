'use client';
import PageTitle from '@/components/backend/body/PageTitle'
import { createUser } from '@/utils/action/user';
import { roles } from '@/utils/utils'
import { redirect } from 'next/navigation';
import React, { FormEvent, useState } from 'react'
import { toast } from 'react-toastify';

const AddUserPage = () => {
    const [error, setError] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const resp = await createUser(formData);
        if(!resp.success && resp.statusCode === 409) {
            setError(resp.message);
        } else if(!resp.success && resp.statusCode === 422) {
            setErrors(resp.payload);
        } else if(resp.success && resp.statusCode === 201) {
            toast.success(resp.message);
            return redirect('/dashboard/user');
        }
    }
  return (
    <div>
      <PageTitle title="Add New User" />
      <div className="p-8 bg-gray-900 rounded-sm w-[40%] mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 text-sm">
            <div className="flex flex-col">
                <label className="font-semibold">Name</label>
                <input type="text" name="name" className="px-4 py-1.5 bg-gray-950 rounded-sm outline-none" />
                { errors.name && <small className="text-red-500 font-semibold"> {errors.name[0]} </small> }
            </div>
            <div className="flex flex-col">
                <label className="font-semibold">E-mail</label>
                <input type="email" name="email" className="px-4 py-1.5 bg-gray-950 rounded-sm outline-none" />
                { error && <small className="text-red-500 font-semibold"> {error} </small> }
                { errors.email && <small className="text-red-500 font-semibold"> {errors.email[0]} </small> }
            </div>
            <div className="flex flex-col">
                <label className="font-semibold">Password</label>
                <input type="password" name="password" className="px-4 py-1.5 bg-gray-950 rounded-sm outline-none" />
                { errors.password && <small className="text-red-500 font-semibold"> {errors.password[0]} </small> }
            </div>
            <div className="flex flex-col">
                <label className="font-semibold">Password</label>
                <select name="role" className="px-4 py-1.5 bg-gray-950 rounded-sm outline-none">
                {
                    roles.map(role => (
                        <option value={role} key={role}> {role} </option>
                    ))
                }
                </select>
            </div>
            <button className="py-2 bg-blue-600 rounded-sm font-semibold cursor-pointer">Create</button>
        </form>
      </div>
    </div>
  )
}

export default AddUserPage
