'use client';
import { articleTypes, authorTitles, genderOptions, publishStatus } from '@/utils/utils'
import { FaCloudUploadAlt } from "react-icons/fa";
import Tiptap from '../../Tiptap';
import {ChangeEvent, FormEvent, KeyboardEvent, useState } from 'react';
import { TiDelete } from "react-icons/ti";
import Image from 'next/image';
import { createArticle } from '@/utils/action/article';
import { toast } from 'react-toastify';
import { redirect } from 'next/navigation';


const ArticleForm = ({cats, user}: {cats: {name: string, _id: string}[], user: {firstName: string, lastName: string, email: string}}) => {
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [fetchedCats, setFetchedCats] = useState(cats);
  const [showCat, setShowCat] = useState(false);
  const [categories, setCategories] = useState<{name: string, _id: string}[]>([])
  const [img, setImg] = useState("");
  const [imgError, setImgError] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] =  useState<Record<string, string>>({});
  const [authorCount, setAuthorcounts] = useState(0);
  const [authors, setAuthors] = useState <Record<string, string>[]>([]);

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if(e.target.files) {
        const file = e.target.files[0];
        if(file.size > 2*1024*1024) {
          setImgError("Image size must exceed 2MB")
        } else {
          setImgError("");
        }
        setImg(URL.createObjectURL(file));
    }
    
  }

  const handleAddCategory = (item: {name: string, _id: string}) => {
    setCategories((prev) => [...prev, item]);
    setFetchedCats(fetchedCats.filter(prev => prev._id !== item._id));
    setShowCat(false);
  }

  const handleRemoveCategory = (item: {name: string, _id: string}) => {
    setCategories(categories.filter(prev => prev._id !== item._id));
    setFetchedCats(prev => [...prev, item]);
  }

  const handleTags = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter' && tag.trim() !== '') {
      e.preventDefault();
      setTags((prev) => [...prev, tag]);
      setTag('');
    }
  }
  const handleRemoveTag = (tag: string) => {
      setTags(prev => prev.filter((item) => item !== tag));
  }


  const handleArticleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.set('categories', categories.toString());
    formData.set('tags', tags.toString());

    
    const resp = await createArticle(formData, categories, tags, authors);

    if(!resp.success && resp.statusCode === 400) {
      setErrors(resp.payload);
    } else if(resp.success && resp.statusCode === 201) {
      toast.success(resp.message);
      redirect("/dashboard/article");
    } else if(!resp.success && resp.statusCode === 401) {
      setImgError(resp.message);
    }
    setLoading(false);
  }
  return (
    <div className="bg-gray-900 p-8 rounded-sm">
      <form onSubmit={handleArticleSubmit} className="flex gap-3 flex-col">
        <div className="flex gap-5">
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-sm font-semibold">First Name <sup className="text-red-600 font-semibold">*</sup> </label>
            <input type="text" name="firstName" defaultValue={user.firstName} className="px-4 py-2 rounded-sm outline-none bg-gray-950" />
            {errors.firstName && <small className="text-red-500"> {errors.firstName[0]} </small>}
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-sm font-semibold">Last Name <sup className="text-red-600 font-semibold">*</sup></label>
            <input type="text" name="lastName" defaultValue={user.lastName} className="px-4 py-2 rounded-sm outline-none bg-gray-950" />
            {errors.lastName && <small className="text-red-500"> {errors.lastName[0]} </small>}
          </div>
        </div>
        <div className="flex gap-5">
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-sm font-semibold">Title <sup className="text-red-600 font-semibold">*</sup></label>
            <select name="title" className="px-4 py-3 rounded-sm outline-none bg-gray-950 text-sm">
              <option value="">---Select One---</option>
              {
                authorTitles.map((title) => (
                  <option value={title} key={title}> {title} </option>
                ))
              }
            </select>
            {errors.title && <small className="text-red-500"> {errors.title[0]} </small>}
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-sm font-semibold">Gender <sup className="text-red-600 font-semibold">*</sup></label>
            <select name="gender" className="px-4 py-3 rounded-sm outline-none bg-gray-950 text-sm">
              <option value="">---Select One---</option>
              {
                genderOptions.map((gender) => (
                  <option value={gender} key={gender}> {gender} </option>
                ))
              }
            </select>
            {errors.gender && <small className="text-red-500"> {errors.gender[0]} </small> }
          </div>
        </div>
        <div className="flex gap-5">
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-sm font-semibold">Email <sup className="text-red-600 font-semibold">*</sup></label>
            <input type="email" name="email" defaultValue={user.email} className="px-4 py-2 rounded-sm outline-none bg-gray-950" />
            {errors.email && <small className="text-red-500"> {errors.email[0]} </small> }
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-sm font-semibold">Phone</label>
            <input type="text" name="phone" className="px-4 py-2 rounded-sm outline-none bg-gray-950" />
          </div>
        </div>
        <div className="flex gap-5">
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-sm font-semibold">Address </label>
            <textarea rows={2} name="address" className="px-4 py-2 rounded-sm resize-none outline-none bg-gray-950" />
          </div>
          <div className="flex-1 flex gap-4 justify-between">
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-sm font-semibold">Author / Featured Image <sup className="text-red-600 font-semibold">*</sup></label>
              <input type="file" id="image" name="image" className="hidden" accept='image/*' onChange={handleImageUpload} />
              <label htmlFor="image" className="px-4 py-2 bg-blue-500 rounded-sm cursor-pointer">
                <FaCloudUploadAlt className="mx-auto text-5xl" />
              </label>
            </div>
            <div className="flex-1 flex flex-col items-end">
            {img &&
              <Image src={img} alt="" width={90} height={40} className={`w-[80px] h-[95px] objet-cover ${imgError && "border-2 border-red-600 animate-pulse"}`} />
            }
            {
              imgError && <small className="text-red-500"> {imgError} </small>
            }
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold">Article Title <sup className="text-red-600 font-semibold">*</sup></label>
          <textarea rows={2} name="articleTitle" className="px-4 py-2 rounded-sm resize-none outline-none bg-gray-950" />
          { errors.articleTitle && <small className="text-red-500"> {errors.articleTitle[0]} </small> }
        </div>
        <div className="flex gap-5">
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-sm font-semibold">Article Type <sup className="text-red-600 font-semibold">*</sup></label>
            <select name="articleType" className="px-4 py-3 rounded-sm outline-none bg-gray-950 text-sm">
              <option value="">---Select One---</option>
              {
                articleTypes.map((title) => (
                  <option value={title} key={title}> {title} </option>
                ))
              }
            </select>
            {errors.articleType && <small className="text-red-500"> {errors.articleType[0]} </small> }
          </div>
          <div className="flex-1 flex flex-col gap-1 relative">
            <label className="text-sm font-semibold">Categories <sup className="text-red-600 font-semibold">*</sup></label>
            <div className="relative">
              <div onClick={()=> setShowCat(prev => !prev)} className="px-4 bg-gray-950 py-2 w-full min-h-11 cursor-pointer flex gap-1 flex-wrap">
              {
                categories.map((category)=> (
                  <div key={category._id} className="pl-2 pr-3 py-1 text-sm bg-gray-900 rounded-sm relative"> {category.name} <TiDelete className="text-red-600 absolute -top-1 -right-1" onClick={()=> handleRemoveCategory(category)} /> </div>
                ))
              }
              </div>
              { errors.categories && <small className="text-red-500"> {errors.categories[0]} </small> }
              {
                showCat && fetchedCats.length > 0 && (
                  <div className="border w-full absolute z-10 flex flex-col gap-1 max-h-80 overflow-y-auto bg-gray-950 text-sm border-gray-400 p-3">
                  {
                    fetchedCats.map((cat) => (
                      <div key={cat._id} onClick={()=> handleAddCategory(cat)} className="w-max cursor-pointer"> {cat.name} </div>
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
          <Tiptap />
        </div>
        {/* Attached Authors Sections */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold">How many authors are related to the articles?</label>
          <select name="attachedAuthors" onChange={(e)=> setAuthorcounts(parseInt(e.target.value))} className="px-4 py-2 rounded-sm resize-none outline-none bg-gray-950">
          {
            [0,1,2,3,4,5].map((item) => (
              <option value={item} key={item}> {item} </option>
            ))
          }
          </select>
        </div>
        {/* Authors Fields */}
        {
          [1,2,3,4,5].map((item) => (
            item <= authorCount &&  <div key={item} className="flex flex-col gap-4 px-10 border border-gray-500 rounded-md py-5">
              <h3> Author - {item} </h3>
              <div className="flex gap-4 text-sm">
                <div className="flex flex-col gap-1 flex-1">
                  <label className="font-semibold">First Name</label>
                  <input type="text" value={authors[item-1]?.firstName || ""} onChange={(e) => {
                    const updatedAuthors = [...authors];
                    updatedAuthors[item-1] = {...updatedAuthors[item-1], firstName: e.target.value}
                    setAuthors(updatedAuthors);
                  }} name="firstName" className="bg-gray-950 outline-none py-2 px-3 rounded-sm" />
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <label className="font-semibold">Last Name</label>
                  <input type="text" value={authors[item-1]?.lastName || ""} onChange={(e) => {
                    const updatedAuthors = [...authors];
                    updatedAuthors[item-1] = {...updatedAuthors[item-1], lastName: e.target.value}
                    setAuthors(updatedAuthors);
                  }} className="bg-gray-950 outline-none py-2 px-3 rounded-sm" />
                </div>
              </div>
              <div className="flex gap-4 text-sm">
                <div className="flex flex-col gap-1 flex-1">
                  <label className="font-semibold">E-mail</label>
                  <input type="text" value={authors[item-1]?.email || ""} onChange={(e) => {
                    const updatedAuthors = [...authors];
                    updatedAuthors[item-1] = {...updatedAuthors[item-1], email: e.target.value};
                    setAuthors(updatedAuthors);
                  }} className="bg-gray-950 outline-none py-2 px-3 rounded-sm" />
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <label className="font-semibold">title</label>
                  <select value={authors[item-1]?.title || ""} onChange={(e) => {
                    const updatedAuthors = [...authors];
                    updatedAuthors[item-1] = {...updatedAuthors[item-1], title: e.target.value}
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
        

        {/* Attached Authors Sections */}
        <div className="flex gap-5">
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-sm font-semibold">Article Tags</label>
            <div className="px-4 py-2 rounded-sm bg-gray-950">
              <div className="flex gap-1 flex-wrap">
              {
              tags.length > 0 && tags.map((tag, i) => <div key={i} className="px-2 py-1 rounded-sm bg-gray-900 text-sm relative"> {tag} <TiDelete className="text-red-500 absolute -top-1 -right-1 cursor-pointer" onClick={()=>handleRemoveTag(tag)} /> </div> )
              }
              <input type="text"  name="articleTags" value={tag} onChange={(e) => setTag(e.target.value)} onKeyDown={handleTags} className="outline-none flex-1" />
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-sm font-semibold">Publish Status</label>
            <select name="publishStatus" className="px-4 py-2 rounded-sm outline-none bg-gray-950 text-sm">
            {
              publishStatus.map(((item) => (
                <option value={item} key={item}> {item} </option>
              )))
            }
            </select> 
          </div>
        </div>
        <button disabled={loading} className={`px-8 py-2 bg-blue-600 rounded-sm cursor-pointer font-semibold w-max self-end disabled:bg-blue-400 disabled:cursor-not-allowed`}> {loading ? "Wait..." : "Create Article"} </button>
      </form>
    </div>
  )
}

export default ArticleForm
