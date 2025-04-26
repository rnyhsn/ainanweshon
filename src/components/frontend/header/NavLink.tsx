import Link from "next/link"
import { FaSortDown } from "react-icons/fa";


const NavLink = ({item}: {item: any}) => {
  return (
    <div className="relative group">
        <Link href={`/category/${item.slug}`} className="px-2 py-2 text-[15px] flex items-center gap-1.5 hover:text-gray-300">
        {item.name} <FaSortDown />
        </Link>
        <div className="hidden group-hover:flex flex-col lg:absolute z-10 bg-gray-950 py-2 w-max">
        {
            item.children.length > 0 && item.children.map((child: any) => (
                <Link href={`/category/${child.slug}`} key={child._id} className="px-3 pr-8 py-1 min-w-32 lg:w-full text-sm border-b border-b-gray-600 last:border-b-0 hover:text-gray-300"> {child.name} </Link>
            ))
        }
        </div>
    </div>
  )
}

export default NavLink
