'use client';
import { createSiteLogo } from "@/utils/action/siteCustom";
import Image from "next/image";
import { redirect } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const SiteForm = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e:ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const resp = await createSiteLogo(formData);
    if(resp.success && resp.statusCode === 201) {
      toast.success(resp.message);
      return redirect("/dashboard/site-custom");
    }
    setLoading(false);
  }
  const handleImageChange = async (e:ChangeEvent<HTMLInputElement>) => {
    if(e.target.files) {
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  } 
  return (
    <div className="w-[35%] mx-auto mt-5 bg-gray-900 rounded-sm py-10 px-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-sm font-semibold">
        <div className="flex flex-col gap-1">
            <label>Position</label>
            <input type="text" name="position" className="px-4 py-2 outline-none rounded-sm bg-gray-950" />
        </div>
        <div className="flex flex-col gap-1">
            <label>Content</label>
            <input type="text" name="description" className="px-4 py-2 outline-none rounded-sm bg-gray-950" />
        </div>
        <div className="flex gap-3 justify-between">
          <div className="flex flex-col gap-1">
            <label>Image</label>
            <input type="file" name="image" onChange={handleImageChange} className="hidden" id="image" />
            <label htmlFor="image" className="bg-blue-600 rounded-sm py-2 w-40 cursor-pointer">
              <FaCloudUploadAlt className="text-3xl mx-auto" />
            </label>
          </div>
          <div>
          {
            imageUrl &&
            <div className="h-full w-[120px] relative">
              <Image src={imageUrl} fill className="object-cover" alt="" />
            </div>
          }
          </div>
        </div>
        <button disabled={loading} className={`py-2.5 bg-green-600 rounded-sm cursor-pointer uppercase ${loading && "cursor-not-allowed bg-green-600/80"}`}>Submit</button>
      </form>
    </div>
  )
}

export default SiteForm
