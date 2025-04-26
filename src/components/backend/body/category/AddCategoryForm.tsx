'use client';
import { createCategory } from "@/utils/action/category";
import { redirect } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";



const AddCategoryForm = ({categories}: {categories: {name: string, _id: string}[]}) => {
    const [error, setError] = useState("");
    console.log(categories);
    const handleCategorySubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const resp = await createCategory(formData);
        if(!resp.success && (resp.statusCode === 422 || resp.statusCode === 409)) {
            setError(resp.message);
        } else if (resp.success && resp.statusCode === 201) {
            toast.success(resp.message);
            return redirect("/dashboard/category");
        }
    }
  return (
    <div className="w-[40%] bg-gray-900 mx-auto p-8 rounded-sm">
      <form className="flex flex-col gap-3" onSubmit={handleCategorySubmit}>
        <div className="flex flex-col gap-1">
            <label className="font-semibold text-sm">Name</label>
            <input type="text" name="name" className="px-4 py-2 bg-gray-950 rounded-sm outline-none"  />
        </div>
        
        <div className="flex flex-col gap-1">
            <label className="font-semibold text-sm">Parent <small className="text-[11px] text-gray-400 px-1">(Optional)</small> </label>
            <select name="parent" className="px-4 py-2 bg-gray-950 rounded-sm outline-none text-xs">
                <option value="">---Select One---</option>
            {
               categories?.length > 0 && categories.map((cat) => (
                    <option value={cat._id} key={cat._id}> {cat.name} </option>
                ))
            }
            </select>
        </div>
        <button className="px-8 py-2 rounded-sm bg-blue-500 font-semibold cursor-pointer">Create</button>
      </form>
    </div>
  )
}

export default AddCategoryForm
