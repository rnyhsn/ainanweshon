import { getHeaderCategories } from "@/utils/action/category"
import NavLink from "./NavLink";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import { auth } from "@/utils/auth";
import LogoutBtn from "@/components/auth/LogoutBtn";
import Image from "next/image";
import { getHeader } from "@/utils/action/siteCustom";



const Header = async () => {
  const resp = await getHeaderCategories();
  const session: any = await auth();
  console.log("Header session:", session);
  console.log("Header session:", session);
  const header = await getHeader();
  const role = session?.user?.role || "USER";
  console.log("Role in Header:", role);
  console.log("Header session 2: ", session);
  console.log("Header session: 3 ", session);
  console.log("Header session: 4 ", session);
  return (
    <div className="bg-gray-950 text-white py-5 px-4 lg:px-10 flex flex-col">
      {/* Header Top Section */}
        <div className="flex justify-between items-center">

            <div className="flex items-center gap-2">
              <div className="relative w-[250px] h-[90px]">
                <Image src={header.image_url} className="" fill alt="" />
              </div>
              <p className="text-sm font-semibold text-purple-500 italic"> {header.description} </p>
            </div>
            
            <div className="flex flex-col gap-2 items-end justify-between">
                <input type="text" className="px-3 py-1.5 text-sm outline-none rounded-sm bg-white text-black" />
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
      <div className="lg:hidden self-end bg-gray-700 px-2 py-2 rounded-sm cursor-pointer" >
        <FaBars className="text-2xl" />
      </div>
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
