"use client";
import Link from "next/link"
import { useState } from "react";
import { FaSortDown } from "react-icons/fa";


const MobileNavLink = ({item, setSignal}: {item: any, setSignal: any}) => {
    const [open, setOpen] = useState(false);
  return (
    <div className="relative">
        <div className="px-2 py-2 text-[15px] flex items-center gap-1.5 cursor-pointer hover:text-gray-300" onClick={()=> setOpen(!open)}>
        {item.name} <FaSortDown />
        </div>
        <div className={`flex-col lg:absolute z-10 w-full bg-gray-950 py-2 ${open ? "flex" : "hidden"}`}>
        {
            item.children.length > 0 && item.children.map((child: any) => (
                <Link href={`/category/${child.slug}`} key={child._id} onClick={()=> setSignal(false)} className="px-3 pr-8 py-1 min-w-32 lg:w-full text-sm border-b border-b-gray-600 last:border-b-0 hover:text-gray-300"> {child.name} </Link>
            ))
        }
        </div>
    </div>
  )
}

export default MobileNavLink