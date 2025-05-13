'use client';
import { updateComment } from '@/utils/action/comment';
import { publishStatus } from '@/utils/utils'
import { redirect } from 'next/navigation';
import React, { FormEvent, useState } from 'react'
import { toast } from 'react-toastify';

const UpdateCommentForm = ({comment}: {comment: any}) => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const handleUpdateComment = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const resp = await updateComment(formData, comment._id);
        if(!resp.success && resp.statusCode === 400) {
            setErrors(resp.payload);
            setLoading(false);
        } else if (resp.success && resp.statusCode === 201) {
            toast.success(resp.message);
            return redirect("/dashboard/comment");
        }
    }
    return (
      <div className="p-8 w-[60%] rounded-sm bg-gray-900 mx-auto">
        <form onSubmit={handleUpdateComment} className="flex flex-col gap-2">
            <div className="flex flex-col relative">
                <label className="text-sm font-semibold mb-1">Article</label>
                <textarea  defaultValue={comment.article.articleTitle} readOnly  className="px-4 py-2 bg-gray-950 rounded-sm resize-none outline-none" />
                <input type="hidden" name="article" defaultValue={comment.article._id} />
            </div>
          <div className="flex gap-4">
              <div className="flex flex-col gap-1 flex-1">
                  <label className="text-sm font-semibold">Name</label>
                  <input type="text" name="name" defaultValue={comment.name} className="px-4 py-2 rounded-sm bg-gray-950 outline-none" />
                  { errors.name && <small className="text-red-600 font-semibold"> {errors.name[0]} </small> }
              </div>
              <div className="flex flex-col gap-1 flex-1">
                  <label className="text-sm font-semibold">Email</label>
                  <input type="text" name="email" defaultValue={comment.email} className="px-4 py-2 rounded-sm bg-gray-950 outline-none" />
                  { errors.email && <small className="text-red-600 font-semibold"> {errors.email[0]} </small> }
              </div>
          </div>
          <div className="flex gap-4">
              <div className="flex flex-col gap-1 flex-1">
                  <label className="text-sm font-semibold">Website</label>
                  <input type="text" name="website" defaultValue={comment.website} className="px-4 py-2 rounded-sm bg-gray-950 outline-none" />
              </div>
              <div className="flex flex-col gap-1 flex-1">
                  <label className="font-semibold text-sm">Publish Status</label>
                  <select name="publishStatus" defaultValue={comment.publishStatus} className="px-4 py-2 rounded-sm bg-gray-950 outline-none">
                  {
                      publishStatus.map((status) => (
                          <option value={status} className="text-sm" key={status}>{status}</option>
                      ))
                  }
                  </select>
              </div>
          </div>
          <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold">Comment</label>
              <textarea name="comment" rows={4} className="py-2 px-4 bg-gray-950 rounded-sm outline-none resize-none" placeholder="Write your Opinion..." defaultValue={comment.comment} />
              { errors.comment && <small className="font-semibold text-red-600"> {errors.comment[0]} </small> }
          </div>
          <button disabled={loading} className={`px-10 font-semibold cursor-pointer hover:bg-blue-500/90 disabled:bg-blue-300 rounded-sm py-2 ${loading ? "bg-blue-300" : "bg-blue-500"}`}> {loading ? "Wait..." : "Update"} </button>
        </form>
      </div>
    )
}

export default UpdateCommentForm
