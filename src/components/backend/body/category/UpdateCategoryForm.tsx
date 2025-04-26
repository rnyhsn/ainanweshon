'use client';
import { updateCategory } from '@/utils/action/category';
import { redirect } from 'next/navigation';
import { FormEvent, useState } from 'react'
import { IoMdRefresh } from 'react-icons/io';
import { toast } from 'react-toastify';

const UpdateCategoryForm = ({categories, fieldValues}: {categories: {name: string, _id: string}[], fieldValues:any}) => {
    const [error, setError] = useState("");
    const handleCategorySubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const resp = await updateCategory(formData);
        if(!resp.success && resp.statusCode === 422) {
            setError(resp.message);
        } else if(resp.success && resp.statusCode === 204) {
            toast.success(resp.message);
            return redirect("/dashboard/category");
        }
    }
  return (
    <div className="w-[40%] bg-gray-900 mx-auto p-8 rounded-sm">
      <form className="flex flex-col gap-3" onSubmit={handleCategorySubmit}>
        <input type="hidden" name="id" value={fieldValues._id} />
        <div className="flex flex-col gap-1">
            <label className="font-semibold">Name</label>
            <input type="text" name="name" defaultValue={fieldValues.name} className="px-4 py-2 bg-gray-950 rounded-sm outline-none"  />
            { error && <small className="text-red-500" > {error} </small> }
        </div>
        <div className="flex flex-col gap-1">
            <label className="font-semibold">Slug</label>
            <div className="px-4 py-2 bg-gray-950 rounded-sm flex items-center">
                <input type="text" name="slug" defaultValue={fieldValues.slug} className="outline-none w-full"  />
                {/* <IoMdRefresh className="font-bold text-2xl cursor-pointer" /> */}
            </div>
        </div>
        <div className="flex flex-col gap-1">
            <label className="font-semibold">Parent <small className="text-[11px] text-gray-400 px-1">(Optional)</small> </label>
            <select name="parent" defaultValue={fieldValues.parent?._id} className="px-4 py-2 bg-gray-950 rounded-sm outline-none text-sm">
                <option value="">---Select One---</option>
            {
               categories.length > 0 && categories.map((cat) => (
                    <option value={cat._id} key={cat._id} > {cat.name} </option>
                ))
            }
            </select>
        </div>
        <button className="px-8 py-2 rounded-sm bg-blue-500 font-semibold cursor-pointer">Create</button>
      </form>
    </div>
  )
}

export default UpdateCategoryForm
