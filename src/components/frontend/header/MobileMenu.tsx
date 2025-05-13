"use client";
import Link from 'next/link';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa'
import MobileNavLink from './MobileNavLink';

const MobileMenu = ({menu}: {menu: string}) => {
    const [open, setOpen] = useState(false);
    const mobileMenu = JSON.parse(menu);
    console.log(mobileMenu)
  return (
    <div className="block lg:hidden">
        <div className="flex justify-end">
          <div className="lg:hidden w-max bg-gray-700 px-2 py-2 rounded-sm cursor-pointer" onClick={()=> setOpen(!open)}>
              <FaBars className="text-2xl" />
          </div>
        </div>
        {
          open &&
        <div className="bg-gray-800 px-3 flex flex-col rounded-sm mt-2 absolute z-10 right-0 left-0">
                <Link href="/" className="px-2 py-2 text-[15px] hover:text-gray-300" onClick={()=> setOpen(false)}>হোম</Link>
                <Link href="/category/আর্টিকেলস" className="px-2 py-2 text-[15px] hover:text-gray-300" onClick={()=> setOpen(false)}>আর্টিকেলস</Link>
              {
                 mobileMenu.map((category: any) => (
                  category.children?.length > 0 && <MobileNavLink item={category} setSignal={setOpen} key={category._id} />
                ))
              } 
                <Link href="/submission" className="px-2 py-2 text-[15px] hover:text-gray-300" onClick={()=> setOpen(false)}> সাবমিশন </Link>
        </div>
        }
    </div>
  )
}

export default MobileMenu