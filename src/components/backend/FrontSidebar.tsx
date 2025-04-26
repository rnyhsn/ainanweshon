'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const FrontSidebar = ({latest, popular}: {latest: any, popular: any}) => {
    const [isLatest, setIsLatest] = useState(true);
  return (
    <div className="bg-white">
        <div className="flex w-full">
            <button className={`flex-1 py-2 cursor-pointer border-t-4 border-gray-500 font-semibold ${!isLatest && "bg-gray-200 border-transparent"}`} onClick={()=> setIsLatest(true)}>Latest</button>
            <button className={`flex-1 py-2 cursor-pointer border-t-4 font-semibold border-gray-500 ${isLatest && "bg-gray-200 border-transparent"}`} onClick={()=> setIsLatest(false)}>Popular</button>
        </div>
        <div className="flex flex-col gap-1 p-3 h-[450px] overflow-y-auto">

        {
                isLatest ? latest.map((art: any, i: number) => (
                    <Link href={`/article/${art.slug}`} key={i} className="flex gap-1.5 items-center">
                    {
                        art.image &&
                        <Image src={art.image} alt="" className="w-[100px] h-[60px]" width={100} height={60}  />
                    }
                    <p className="text-xs font-semibold"> {art.articleTitle} </p>
                    </Link>
            )): (
                popular.map((art: any, i: number) => (
                    <Link href={`/article/${art.slug}`} key={i} className="flex gap-1.5 items-center">
                    {
                        art.image &&
                        <Image src={art.image} alt="" className="w-[100px] h-[60px]" width={100} height={60}  />
                    }
                    <p className="text-xs font-semibold"> {art.articleTitle} </p>
                    </Link>
                ))
            )
        }
    </div>
    </div>
  )
}

export default FrontSidebar