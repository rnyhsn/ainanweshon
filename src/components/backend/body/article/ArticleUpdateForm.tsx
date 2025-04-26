'use client';
import { articleTypes, authorTitles, genderOptions, publishStatus } from '@/utils/utils'
import { FaCloudUploadAlt } from "react-icons/fa";
import Tiptap from '../../Tiptap';
import { ChangeEvent, FormEvent, KeyboardEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { TiDelete } from "react-icons/ti";
import { FaFileWord } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

import Link from 'next/link';
import { updateArticle } from '@/utils/action/article';
import { notFound, redirect } from 'next/navigation';
import { toast } from 'react-toastify';



const ArticleUpdateForm = ({item, fetchedCats}: {item: any, fetchedCats: any}) => {
  const [categories, setCategories] = useState(item?.categories);
  const [fetchedCategories, setFetchedCategories] = useState(fetchedCats);
  const [imgUrl, setImgUrl] = useState("");
  const [imgError, setImgError] = useState("");
  const [tags, setTags] = useState<string[]>(item?.tags);
  const [tag, setTag] = useState("");
  const [showCat, setShowCat] = useState(false);
  const [authors, setAuthors] = useState<Record<string, string>[]>(item?.attachedAuthors);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setCategories(item?.categories);
  }, [item]);

  const handleUpdateImg = (e:ChangeEvent<HTMLInputElement>) => {
    if(e.target.files) {
      let file = e.target.files[0];
      if(file.size > 2*1024*1024) {
        setImgError("Image size should not exceed 2MB");
      } else {
        setImgError("");
      }
      setImgUrl(URL.createObjectURL(file));
    }
  }

  const handleAddCategory = (category: any) => {
    setCategories([...categories, category]);
    setFetchedCategories(fetchedCategories.filter((cat: any) => cat._id !== category._id));
    setShowCat(prev => !prev);
  }

  const handleRemoveCategory = (category: any) => {
    setCategories(categories.filter((cat: any) => cat._id !== category._id));
    setFetchedCategories([...fetchedCategories, category]);
    
  }

  const handleRemoveAuthor = (index: number) => {
      setAuthors(authors.filter((_, i) => index !== i));
  }

  const handleRemoveTag = (tag: string) => {
      setTags(prev => prev.filter(item => item !== tag));
  }
  

  const handleTagsAdd = (e:KeyboardEvent<HTMLInputElement>) => {
    
    if(e.key === 'Enter' && tag.trim() !== '') {
      e.preventDefault();
      setTags((prev) => [...prev, tag]);
      setTag('');
    }
  }

  const handleUpdateSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true)
      const formData = new FormData(e.currentTarget);
      const resp = await updateArticle(formData, categories, tags, authors);
      
      if(!resp.success && resp.statusCode === 404) {
        return notFound();
      } else if(resp.success && resp.statusCode === 201) {
        toast.success(resp.message);
        return redirect("/dashboard/article");
      }
      setLoading(false);
  }

  
  return (
    <div className="bg-gray-900 p-8 rounded-sm">
      <form onSubmit={handleUpdateSubmit} className="flex gap-3 flex-col">
        <input type="hidden" name="id" value={item?._id} />
        <div className="flex gap-5">
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-sm font-semibold">First Name <sup className="text-red-600 font-semibold">*</sup> </label>
            <input type="text" name="firstName" defaultValue={item?.firstName} className="px-4 py-2 rounded-sm outline-none bg-gray-950" />
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-sm font-semibold">Last Name <sup className="text-red-600 font-semibold">*</sup></label>
            <input type="text" name="lastName" defaultValue={item?.lastName} className="px-4 py-2 rounded-sm outline-none bg-gray-950" />
          </div>
        </div>
        <div className="flex gap-5">
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-sm font-semibold">Title <sup className="text-red-600 font-semibold">*</sup></label>
            <select name="title" defaultValue={item?.title} className="px-4 py-3 rounded-sm outline-none bg-gray-950 text-sm">
              <option value="">---Select One---</option>
              {
                authorTitles.map((title) => (
                  <option value={title} key={title}> {title} </option>
                ))
              }
            </select>
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-sm font-semibold">Gender <sup className="text-red-600 font-semibold">*</sup></label>
            <select name="gender" defaultValue={item?.gender} className="px-4 py-3 rounded-sm outline-none bg-gray-950 text-sm">
              <option value="">---Select One---</option>
              {
                genderOptions.map((gender) => (
                  <option value={gender} key={gender}> {gender} </option>
                ))
              }
            </select>
          </div>
        </div>
        <div className="flex gap-5">
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-sm font-semibold">Email <sup className="text-red-600 font-semibold">*</sup></label>
            <input type="email" name="email" defaultValue={item?.email} className="px-4 py-2 rounded-sm outline-none bg-gray-950" />
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-sm font-semibold">Phone</label>
            <input type="text" name="phone" defaultValue={item?.phone} className="px-4 py-2 rounded-sm outline-none bg-gray-950" />
          </div>
        </div>
        <div className="flex gap-5">
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-sm font-semibold">Address </label>
            <textarea rows={2} name="address" defaultValue={item?.address} className="px-4 py-2 rounded-sm resize-none outline-none bg-gray-950" />
          </div>
          <div className="flex-1 flex gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-sm font-semibold">Author / Featured Image <sup className="text-red-600 font-semibold">*</sup></label>
              <input type="file" id="image" name="image" accept='image/*' onChange={handleUpdateImg} className="hidden" />
              <label htmlFor="image" className="px-4 py-2 bg-blue-500 rounded-sm cursor-pointer">
                <FaCloudUploadAlt className="mx-auto text-5xl" />
              </label>
            </div>
            <div className="flex-1">
              <div className={`relative h-full w-32 ${imgError && "border-4 border-red-500 animate-pulse"}`}>
                {
                  imgUrl ? (
                      <Image src={imgUrl} alt="" className="object-cover" fill />
                  ) : (
                    item?.image_url && <Image src={item?.image_url} alt="" className="object-cover" fill />
                    
                  )
                }
              </div>
              {imgError && <small className="text-red-600 font-semibold"> {imgError} </small> }
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold">Article Title <sup className="text-red-600 font-semibold">*</sup></label>
          <textarea rows={2} name="articleTitle" defaultValue={item?.articleTitle} className="px-4 py-2 rounded-sm resize-none outline-none bg-gray-950" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold">Article Slug <sup className="text-red-600 font-semibold">*</sup></label>
          <textarea rows={2} name="slug" defaultValue={item?.slug} className="px-4 py-2 rounded-sm resize-none outline-none bg-gray-950" />
        </div>
        <div className="flex gap-5">
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-sm font-semibold">Article Type <sup className="text-red-600 font-semibold">*</sup></label>
            <select name="articleType" defaultValue={item?.articleType} className="px-4 py-3 rounded-sm outline-none bg-gray-950 text-sm">
              <option value="">---Select One---</option>
              {
                articleTypes.map((title) => (
                  <option value={title} key={title}> {title} </option>
                ))
              }
            </select>
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-sm font-semibold">Categories <sup className="text-red-600 font-semibold">*</sup></label>
            <div className="relative">
              <div onClick={()=> setShowCat(prev => !prev)} className="px-4 py-3 rounded-sm outline-none bg-gray-950 text-sm flex gap-1 flex-wrap">
              {
                categories?.map((category: any, i: number) => (
                  <div className="px-2 py-1 text-sm bg-gray-900 rounded-sm relative" key={i}> {category.name} <TiDelete onClick={() => handleRemoveCategory(category)} className="absolute -top-2 -right-2 text-xl text-red-500 cursor-pointer" />  </div>
                ))
              }
              </div>
              {
                showCat && (
                  <div className="bg-gray-950 border border-gray-400 px-4 py-2 absolute z-10  w-full text-sm h-80 overflow-y-auto">
                  {
                    fetchedCategories.map((category: any, i: number) => (
                      <div key={i} onClick={() => handleAddCategory(category)} className="cursor-pointer my-1 w-max"> {category.name} </div>
                    ))
                  }
                  </div>
                )
              }
            
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold">Article Content <sup className="text-red-600 font-semibold">*</sup></label>
          <Tiptap content={item?.content} />
        </div>
        <div className="flex gap-5">
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-sm font-semibold">Article Tags</label>
            <div className="px-4 py-2 rounded-sm outline-none bg-gray-950 flex gap-1 flex-wrap">
            {
              tags?.map((tag: string, i: number) => (
                <div className="px-2 py-1 text-sm bg-gray-900 rounded-sm relative" key={i}> {tag} <TiDelete className="absolute -top-2 -right-2 text-red-500 text-xl cursor-pointer" onClick={()=> handleRemoveTag(tag)} /> </div>
              ))
            }
              <input type="text" name="tag" value={tag} onChange={(e) => setTag(e.target.value)} onKeyDown={handleTagsAdd} className="outline-none" />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-sm font-semibold">Publish Status</label>
            <select name="publishStatus" defaultValue={item?.publishStatus} className="px-4 py-2 rounded-sm outline-none bg-gray-950 text-sm">
            {
              publishStatus.map(((item) => (
                <option value={item} key={item}> {item} </option>
              )))
            }
            </select> 
          </div>
        </div>
        {/* Attached Authors Section Starts */}
        {
         authors?.map((author: any, i: number) => (
          <div key={i}  className="flex flex-col gap-4 px-10 border border-gray-500 rounded-md py-5 relative">
            <h3> Author - {i+1} </h3>
            <div onClick={() => handleRemoveAuthor(i)} className="absolute top-2 hover:bg-red-500 right-2 w-10 h-10 rounded-full cursor-pointer bg-red-600 flex items-center justify-center">
              <FaTrashAlt />
            </div>
            <div className="flex gap-4 text-sm">
              <div className="flex flex-col gap-1 flex-1">
                <label className="font-semibold">First Name</label>
                <input type="text" value={author?.firstName} onChange={(e)=> {
                  const updatedAuthors = [...authors];
                  updatedAuthors[i] = {...updatedAuthors[i], firstName: e.target.value}
                  setAuthors(updatedAuthors);
                }} className="bg-gray-950 outline-none py-2 px-3 rounded-sm" />
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <label className="font-semibold">Last Name</label>
                <input type="text" value={author?.lastName} onChange={(e) => {
                  const updatedAuthors = [...authors];
                  updatedAuthors[i] = {...updatedAuthors[i], lastName: e.target.value}
                  setAuthors(updatedAuthors);
                }} className="bg-gray-950 outline-none py-2 px-3 rounded-sm" />
              </div>
            </div>
            <div className="flex gap-4 text-sm">
              <div className="flex flex-col gap-1 flex-1">
                <label className="font-semibold">E-mail</label>
                <input type="text" value={author?.email} onChange={(e) => {
                  const updatedAuthors = [...authors]
                  updatedAuthors[i] = {...updatedAuthors[i], email: e.target.value}
                  setAuthors(updatedAuthors);
                }} className="bg-gray-950 outline-none py-2 px-3 rounded-sm" />
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <label className="font-semibold">title</label>
                <select value={author?.title} onChange={(e) => {
                  const updatedAuthors = [...authors];
                  updatedAuthors[i] = {...updatedAuthors[i], title: e.target.value};
                  setAuthors(updatedAuthors);
                }} className="bg-gray-950 outline-none py-2 px-3 rounded-sm" >
                {
                  authorTitles.map((title, i) => (
                    <option value={title} key={i}> {title} </option>
                  ))
                }
                </select>
              </div>
            </div>
        </div>
         ))
        }
       

        {/* Attached Authors Section Starts */}
        <div className="flex justify-between">
            <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold">Attached File</label>
                {/* <input type="text" name="firstName" className="px-4 py-2 rounded-sm outline-none bg-gray-950" /> */}
                {
                  item?.file_url &&
                  <div className="flex flex-col gap-2">
                    <Link href={item?.file_url} target='_blank'>
                      <FaFileWord className="text-5xl" />
                    </Link>
                    <div>
                      <input type="checkbox" name="fileDelete" /> Do you want to delete the file?
                    </div>
                  </div>
                }
            </div>
            <button disabled={loading} className={`px-8 py-2 bg-blue-600 rounded-sm cursor-pointer font-semibold w-max self-end ${loading && "cursor-not-allowed bg-blue-600/70"}`}> {loading ? "Wait..." : "Update"} </button>
        </div>
      </form>
    </div>
  )
}

export default ArticleUpdateForm
