'use client';

import { createComment } from "@/utils/action/comment";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

const CommentForm = ({id}: {id: string}) => {
    console.log("Comment Id: ", id)
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [empty, setEmpty] = useState(false);
    const router = useRouter();
    const params = useParams();
    const slug = params.slug;
    const decodedSlug = decodeURIComponent(slug as string);
    const handlcComment = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const resp = await createComment(formData);
        if(!resp.success && resp.statusCode ===400) {
            setErrors(resp.payload);
        } else if(resp.success && resp.statusCode === 201) {
            toast.success(resp.message);
            setEmpty(true);
            router.push(`/article/${decodedSlug}`);
        } 
    }
  return (
    <form onSubmit={handlcComment} className="flex flex-col gap-5">
                <div className="flex gap-4">
                    <input type="hidden" value={id} name="article" />
                    <div className="flex flex-col gap-1 flex-1">
                        <label className="text-sm font-semibold">Name</label>
                        <input type="text" name="name" className="py-2 px-4 border border-gray-300 outline-none" />
                        { errors.name && <small className="text-red-500 font-semibold"> {errors.name[0]} </small> }
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                        <label className="text-sm font-semibold">Email</label>
                        <input type="text" name="email" className="py-2 px-4 border border-gray-300 outline-none" />
                        {errors.email && <small className="text-red-500 font-semibold"> {errors.email[0]} </small> }
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold">Website <small className="text-sm text-gray-600">(optional)</small> </label>
                    <input type="text" name="website" className="py-2 px-4 border border-gray-300 outline-none" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="font-semibold text-sm">Comment </label>
                    <textarea rows={6} name="comment" className="py-2 px-4 border border-gray-300 outline-none resize-none" />
                    { errors.comment && <small className="text-red-500 font-semibold"> {errors.comment[0]} </small> }
                </div>
                <button className="py-2 px-8 bg-gray-950 text-white rounded-sm w-max font-semibold uppercase cursor-pointer hover:gray-900">Submit</button>
            </form>
  )
}

export default CommentForm
