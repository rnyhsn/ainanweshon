'use client';

import { createComment } from "@/utils/action/comment";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

const CommentForm = ({id}: {id: string}) => {
    console.log("Comment Id: ", id)
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [website, setWebsite] = useState("");
    const [content, setContent] = useState("");
    const router = useRouter();
    const params = useParams();
    const slug = params.slug;
    const decodedSlug = decodeURIComponent(slug as string);
    const handlcComment = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const resp = await createComment(formData);
        if(!resp.success && resp.statusCode ===400) {
            setErrors(resp.payload);
        } else if(resp.success && resp.statusCode === 201) {
            toast.success(resp.message)
            setName("");
            setEmail("");
            setWebsite("");
            setContent("");
            router.push(`/article/${decodedSlug}`);
        }
        setLoading(false);
    }
  return (
    <form onSubmit={handlcComment} className="flex flex-col gap-5">
                <div className="flex flex-col sm:flex-row gap-4">
                    <input type="hidden" value={id} name="article" />
                    <div className="flex flex-col gap-1 flex-1">
                        <label className="text-sm font-semibold">Name</label>
                        <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} className="py-2 px-4 border border-gray-300 outline-none" />
                        { errors.name && <small className="text-red-500 font-semibold"> {errors.name[0]} </small> }
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                        <label className="text-sm font-semibold">Email</label>
                        <input type="text" name="email" value={email} onChange={e => setEmail(e.target.value)} className="py-2 px-4 border border-gray-300 outline-none" />
                        {errors.email && <small className="text-red-500 font-semibold"> {errors.email[0]} </small> }
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold">Website <small className="text-sm text-gray-600">(optional)</small> </label>
                    <input type="text" name="website" value={website} onChange={e => setWebsite(e.target.value)} className="py-2 px-4 border border-gray-300 outline-none" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="font-semibold text-sm">Comment </label>
                    <textarea rows={6} name="comment" value={content} onChange={e => setContent(e.target.value)} className="py-2 px-4 border border-gray-300 outline-none resize-none" />
                    { errors.comment && <small className="text-red-500 font-semibold"> {errors.comment[0]} </small> }
                </div>
                <button disabled={loading} className={`py-2 px-8 text-white rounded-sm w-max font-semibold uppercase cursor-pointer hover:bg-gray-900 disabled:cursor-not-allowed ${loading ? "bg-gray-600" : "bg-gray-950"}`}> {loading ? "Wait..." : "Submit"} </button>
            </form>
  )
}

export default CommentForm
