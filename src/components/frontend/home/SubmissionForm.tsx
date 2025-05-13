'use client';
import { articleTypes, authorTitles, genderOptions } from '@/utils/utils'
import Image from 'next/image';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { FiUpload } from "react-icons/fi";
import { TiDelete } from "react-icons/ti";
import { AiTwotoneFileAdd } from "react-icons/ai";
import Link from 'next/link';
import { FaFileWord } from "react-icons/fa";

import { createArticleFromFrontend } from '@/utils/action/article';
import { getCategories } from '@/utils/action/category';
import { redirect } from 'next/navigation';
import { toast } from 'react-toastify';





const SubmissionForm = ({user}: {user: {firstName: string, lastName: string, email: string}}) => {
   
    const [authorCount, setAuthorCount] = useState(0);
    const [authors, setAuthors] = useState<Record<string, string>[]>([]);
    const [imgUrl, setImgUrl] = useState("");
    const [fileUrl, setFileUrl] = useState("");
    const [fileError, setFileError] = useState("");
    const [fetchedCats, setFetchedCats] = useState<{name: string, _id: string}[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [tagString, setTagString] = useState("");
    const [pending, setPending] = useState(false);
   


    useEffect(() => {
        const fetchedCategories = async () => {
            const resp = await getCategories();
            if(resp.success && resp.statusCode === 200) {
                setFetchedCats(resp.payload);
            }
        }
        fetchedCategories();
    }, [])
 


    const handleImageChange = (e:ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
            const img = URL.createObjectURL(e.target.files[0]);
            setImgUrl(img);
        }
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
            const file = e.target.files[0];
            const ext = file.name.split(".").pop();
            const url = URL.createObjectURL(file)
            if(ext === 'docx') {
                setFileUrl(url);
                setFileError("");
            } else {
                setFileError("Only docx (ws word) file is allowed");
                setFileUrl("");
            }
        }
    }

    

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // let tags: string[];
        // if(tagString.trim()) {
        //     tags = tagString.split(',').map(item => item.trim());
        //     console.log(tags);
        // }
        setPending(true);
        const formData = new FormData(e.currentTarget);
        
        const resp = await createArticleFromFrontend(formData, authors);
        // console.log(resp)
        if(!resp.success && resp.statusCode === 401) {
            setErrors(resp.payload);
        }
        if(!resp.success && resp.statusCode === 400) {
            setErrors(resp.payload);
        } else if (resp.success && resp.statusCode === 201) {
            toast.success(resp.message);
            return redirect("/");
        }
        setPending(false);
    }

  return (
    <div className="px-5 lg:px-10">
        <h1 className="text-center mt-10 mb-8">Submit Your Post Here</h1>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 md:w-5/6 lg:w-4/6 mx-auto">
            <div className="flex flex-col md:flex-row gap-5 w-full">
                <div className="flex flex-col gap-1 flex-1">
                    <label className="font-semibold">First Name</label>
                    <input type="text" name="firstName" defaultValue={user.firstName} className="px-4 py-2 outline-none bg-white border border-gray-300 focus:ring-1 rounded-sm" />
                    { errors.firstName && <small className="text-red-600 font-semibold"> {errors.firstName[0]} </small> }
                </div>
                <div className="flex flex-col gap-1 flex-1">
                    <label className="font-semibold">Last Name</label>
                    <input type="text" name="lastName" defaultValue={user.lastName} className="px-4 py-2 outline-none bg-white border border-gray-300 focus:ring-1 rounded-sm"/>
                    { errors.lastName && <small className="text-red-600 font-semibold"> {errors.lastName[0]} </small> }
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-5 w-full">
                <div className="flex flex-col gap-1 flex-1">
                    <label className="font-semibold">Title</label>
                    <select name="title" className="px-4 py-2 outline-none bg-white border border-gray-300 focus:ring-1 rounded-sm font-semibold">
                    <option value="">---Select One---</option>
                    {
                    authorTitles.map((title) => (
                        <option value={title} className="text-sm" key={title}> {title} </option>
                    ))
                    }
                    </select>
                    { errors.title && <small className="text-red-600 font-semibold"> {errors.title[0]} </small> }
                </div>
                <div className="flex flex-col gap-1 flex-1">
                    <label className="font-semibold">Gender</label>
                    <select name="gender" className="px-4 py-2 outline-none bg-white border border-gray-300 focus:ring-1 rounded-sm font-semibold">
                    <option value="">---Select One---</option>
                    {
                        genderOptions.map((gender) => (
                            <option value={gender} className="text-sm" key={gender}> {gender} </option>
                        ))
                    }
                    </select>
                    { errors.gender && <small className="text-red-600 font-semibold"> {errors.gender[0]} </small> }
                </div>
            </div>
            <div className="flex gap-5 flex-col md:flex-row w-full">
                <div className="flex flex-col gap-1 flex-1">
                    <label className="font-semibold">E-mail</label>
                    <input type="text" name="email" defaultValue={user.email} className="px-4 py-2 outline-none bg-white border border-gray-300 focus:ring-1 rounded-sm" />
                    { errors.email && <small className="text-red-600 font-semibold"> {errors.email[0]} </small> } 
                </div>
                <div className="flex flex-col gap-1 flex-1">
                    <label className="font-semibold">Phone</label>
                    <input type="text" name="phone" className="px-4 py-2 outline-none bg-white border border-gray-300 focus:ring-1 rounded-sm"/>
                </div>
            </div>
            <div className="flex gap-5 flex-col md:flex-row w-full">
                <div className="flex flex-col gap-1 flex-1">
                    <label className="font-semibold">Address</label>
                    <textarea  name="address" rows={2} className="px-4 py-2 outline-none bg-white border border-gray-300 focus:ring-1 rounded-sm resize-none" />
                </div>
                <div className="flex items-center justify-between gap-8 flex-1">
                    <div className="flex flex-col gap-1 flex-1">
                        <label className="font-semibold">Your Image</label>
                        <input type="file" name="image" id="userImg" accept='image/*' onChange={handleImageChange} className="px-4 py-2 outline-none bg-white border border-gray-300 focus:ring-1 rounded-sm hidden"/>
                        <label htmlFor="userImg" className="w-full bg-blue-500 py-2 px-4 rounded-md border-2 border-transparent cursor-pointer hover:bg-transparent hover:border-blue-500 group">
                            <FiUpload className="text-4xl font-semibold mx-auto text-white group-hover:text-blue-500" />
                        </label>
                        { imgUrl ? "" : errors.img && <small className="text-red-600 font-semibold"> {errors.img} </small> }
                    </div>
                    <div className="flex-1 h-full">
                    {
                        imgUrl && <div className="relative h-[100px] w-[100px] bg-red-400">
                            <Image src={imgUrl} className="object-cover" fill alt="" />
                            <TiDelete onClick={()=> setImgUrl("")} className="text-red-500 absolute -top-3 -right-3 text-4xl cursor-pointer" />
                        </div>
                    }
                    
                    </div>
                </div>
            </div>
            <div>
                <h1 className="text-center">Article Section</h1>
            </div>
            <div className="flex flex-col gap-1">
                <label className="font-semibold">Article Title</label>
                <textarea name="articleTitle" rows={2} className="px-4 py-2 outline-none bg-white border border-gray-300 focus:ring-1 rounded-sm resize-none" />
                {errors.articleTitle && <small className="text-red-600 font-semibold"> {errors.articleTitle[0]} </small> }
            </div>
            <div className="flex gap-5 flex-col md:flex-row w-full">
                <div className="flex flex-col gap-1 flex-1">
                    <label className="font-semibold">Article Type</label>
                    <select name="articleType" className="px-4 py-2 outline-none bg-white border border-gray-300 focus:ring-1 rounded-sm font-semibold">
                    <option value="">---Select One---</option>
                    {
                    articleTypes.map((title) => (
                        <option value={title} className="text-sm" key={title}> {title} </option>
                    ))
                    }
                    </select>
                    { errors.articleType && <small className="text-red-500 font-semibold"> {errors.articleType} </small> }
                </div>
                <div className="flex flex-col gap-1 flex-1">
                    <label className="font-semibold">Category</label>
                    <select name="category" className="px-4 py-2 outline-none bg-white border border-gray-300 focus:ring-1 rounded-sm font-semibold">
                    <option value="">---Select One---</option>
                    {
                        fetchedCats.map((cat) => (
                            <option value={cat._id} className="text-sm" key={cat._id}> {cat.name} </option>
                        ))
                    }
                    </select>
                    { errors.categories && <small className="font-semibold text-red-600"> {errors.categories[0]} </small>  }
                </div>
            </div>
            <div className="flex gap-5 flex-col md:flex-row w-full">
                <div className="flex flex-col gap-1 flex-1">
                    <label className="font-semibold">Related Tags</label>
                    <div className="px-4 py-2 outline-none bg-white border border-gray-300 focus:ring-1 rounded-sm">
                        <input type="text" name="tags" value={tagString} onChange={(e) => setTagString(e.target.value)} className="outline-none w-full" />
                    </div>
                    <small className="font-semibold">Use comma to seperate each tag ( , ) </small>
                </div>
                <div className="flex gap-5 flex-1">
                    <div className="flex flex-col gap-1 flex-[2]">
                    <label className="font-semibold">Attached Files <small className="text-gray-700 text-[10px]">(only .docx file allowed)</small> </label>
                    <input type="file" onChange={handleFileChange} name="file" id="file" className="px-4 py-2 outline-none bg-white border border-gray-300 focus:ring-1 rounded-sm hidden"/>
                    <label htmlFor="file" className="py-2 bg-blue-500 rounded-md cursor-pointer">
                        <AiTwotoneFileAdd className="text-3xl mx-auto" />
                    </label>
                    </div>
                    <div className="flex-1 flex flex-col items-center">
                    {
                        fileError && <p className="text-red-500 font-semibold animate-pulse"> {fileError} </p>
                    }
                    {
                        fileUrl && <Link href={fileUrl}> <FaFileWord className="text-6xl" /> </Link>
                    }
                    {
                        fileUrl ? "" : errors.file && <p className="text-red-600 font-semibold animate-pulse"> {errors.file} </p>
                    }
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <label className="font-semibold">Home Many Additional Authors Associated to the Post? </label>
                <select name="authors" onChange={(e) => setAuthorCount(parseInt(e.target.value)) }  className="px-4 py-2 outline-none bg-white border border-gray-300 focus:ring-1 rounded-sm">
                {
                    [0,1,2,3,4,5].map((item) => (
                        <option value={item} key={item} className="text-sm"> {item} </option>
                    ))
                }
                </select>
            </div>
            <div className="flex flex-col gap-4">
            {
            [1,2,3,4,5].map((count) => (
                count <= authorCount  &&  <div key={count} className="flex flex-col gap-3 px-8 py-2 border border-gray-300 rounded-md">
                <div className="flex w-full flex-col md:flex-row gap-4">
                    <div className="flex flex-col gap-1 flex-1">
                        <label className="text-sm font-semibold">First Name</label>
                        <input type="text" value={authors[count-1]?.firstName || ""} onChange={e => {
                            const updatedAuthors = [...authors];
                            updatedAuthors[count-1] = {...updatedAuthors[count-1], firstName: e.target.value};
                            setAuthors(updatedAuthors);
                        }} className="px-4 py-1.5 outline-none bg-white border border-gray-300 focus:ring-1 rounded-sm" />
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                        <label className="font-semibold text-sm">Last Name</label>
                        <input type="text" value={authors[count-1]?.lastName || ""} onChange={e => {
                            const updatedAuthors = [...authors];
                            updatedAuthors[count-1] = {...updatedAuthors[count-1], lastName: e.target.value};
                            setAuthors(updatedAuthors);
                        }} className="px-4 py-1.5 outline-none bg-white border border-gray-300 focus:ring-1 rounded-sm" />
                    </div>
                </div>
                <div className="flex w-full flex-col md:flex-row gap-4">
                    <div className="flex flex-col gap-1 flex-1">
                        <label className="text-sm font-semibold">Title</label>
                        <select value={authors[count-1]?.title || ""} onChange={e => {
                            const updatedAuthors = [...authors];
                            updatedAuthors[count-1] = {...updatedAuthors[count-1], title: e.target.value};
                            setAuthors(updatedAuthors);
                        }} className="px-4 py-1.5 outline-none bg-white border border-gray-300 focus:ring-1 rounded-sm">
                        <option value="">---Select One---</option>
                        {
                            authorTitles.map((title) => (
                                <option value={title} key={title} className="text-sm"> {title} </option>
                            ))
                        }
                        </select>
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                        <label className="font-semibold text-sm">E-mail</label>
                        <input type="text" value={authors[count-1]?.email || ""} onChange={e => {
                            const updatedAuthors = [...authors];
                            updatedAuthors[count-1] = {...updatedAuthors[count-1], email: e.target.value}
                            setAuthors(updatedAuthors);
                        }} className="px-4 py-1.5 outline-none bg-white border border-gray-300 focus:ring-1 rounded-sm" />
                    </div>
                </div>
             </div>
            ))
            } 
            </div>
            <button disabled={pending} className={`px-8 py-2 rounded-sm text-white font-semibold w-max uppercase cursor-pointer hover:bg-gray-900 disabled:cursor-not-allowed disabled:bg-gray-600  ${pending ? "bg-gray-600" : "bg-gray-950"}`}> { pending ? "Submitting..." : "Submit" } </button>
        </form>

    </div>
  )
}

export default SubmissionForm
