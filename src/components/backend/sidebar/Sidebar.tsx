'use client';
import { IMenu } from "@/utils/utils"
import MenuLink from "./MenuLink"
import Link from "next/link"

import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { BiSolidCollection } from "react-icons/bi";
import { FaComments } from "react-icons/fa";
import { FaArchive } from "react-icons/fa";

 const adminMenu: IMenu[] = [
    {title: 'Dashboard', path: '/dashboard', icon: MdDashboard},
    {title: 'User', path: '/dashboard/user', icon: FaUser},
    {title: 'Category', path: '/dashboard/category', icon: BiSolidCollection},
    {title: 'Article', path: '/dashboard/article', icon: FaArchive},
    {title: 'Comment', path: '/dashboard/comment', icon: FaComments},
    {title: 'Site Logo', path: '/dashboard/site-custom', icon: FaComments},
]


const DashboardSidebar = () => {
  return (
    <div className="w-1/5 bg-gray-900 h-screen flex fixed flex-col gap-1 pl-2 pt-8">
    <Link href="/" className="text-3xl font-semibold mb-5 pl-4">Logo</Link>
    {
    adminMenu.map((menu) => (
        <MenuLink menu={menu} key={menu.title} />
    ))
    }
    </div>
  )
}

export default DashboardSidebar
