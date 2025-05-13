import { getHeaderCategories } from "@/utils/action/category"
import NavLink from "./NavLink";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { auth } from "@/utils/auth";
import LogoutBtn from "@/components/auth/LogoutBtn";
import Image from "next/image";
import { getHeader } from "@/utils/action/siteCustom";
import MobileMenu from "./MobileMenu";



const Header = async () => {
  const resp = await getHeaderCategories();
  const session: any = await auth();
  const header = await getHeader();
  const role = session?.user?.role || "USER";

 
  return (
    <div className="bg-gray-950 text-white py-5 px-4 xl:px-10 flex flex-col">
      {/* Header Top Section */}
        <div className="flex justify-between items-center">

            <div className="flex flex-col md:flex-row items-center gap-2">
              <div className="relative w-[160px] h-[60px] lg:w-[250px] lg:h-[90px] self-start">
                <Image src={header.image_url} className="" fill alt="" />
              </div>
              <p className="text-[8px] md:text-sm font-semibold text-purple-500 italic"> {header.description} </p>
            </div>
            
            <div className="flex flex-col gap-2 self-start items-end justify-between pb-2">
              <div className="flex items-center gap-2 bg-white text-black px-3 py-1.5 rounded-sm">
                <input type="text" className="text-sm outline-none w-[130px]" placeholder="Search here..." />
                <FaSearch />
              </div>
              {
                session?.user && 
                <div className="flex flex-col gap-1">
                {
                  role === 'ADMIN' &&
                  <Link href="/dashboard" className="px-4 py-1.5 bg-blue-600 rounded-sm"> Dashboard </Link>
                }
                  <LogoutBtn />
                </div>
              }
            </div>
        </div>
      {/* Header Bottom menu Section */}
      {
        resp.success && resp.statusCode === 200 && 
        <MobileMenu menu={JSON.stringify(resp.payload)} />
      }
      <div className="bg-gray-800 hidden px-3 lg:flex flex-col lg:flex-row rounded-sm mt-7">
        <Link href="/" className="px-2 py-2 text-[15px] hover:text-gray-300">হোম</Link>
        <Link href="/category/আর্টিকেলস" className="px-2 py-2 text-[15px] hover:text-gray-300">আর্টিকেলস</Link>
        {
          resp.success && resp.statusCode === 200 && resp.payload.map((category: any) => (
            category.children?.length > 0 && <NavLink item={category} key={category._id} />
          ))
        } 
        <Link href="/submission" className="px-2 py-2 text-[15px] hover:text-gray-300"> সাবমিশন </Link>

        
      </div>
    </div>
  )
}

export default Header
