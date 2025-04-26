'use client';

import { ITEM_PER_PAGE } from "@/utils/constant";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

const Pagination = ({count}: {count: number}) => {

  const {replace} = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  // console.log("Pagination:", count);
  const params = new URLSearchParams(searchParams);
  const page = Number(params.get('page')) || 1;
  const hasPrev = ITEM_PER_PAGE * (page - 1) > 0;
  const hasNext = ITEM_PER_PAGE * (page-1) + ITEM_PER_PAGE < count; /// record count should be here

  const handleChangePage = (type: string) => {
    type === 'prev' ? params.set('page', String(page-1)) : params.set('page', (page+1).toString());

    replace(`${pathname}?${params}`);
  }
    
  return (
    <div className="flex gap-2 justify-end mt-5">
        <button className={`px-2 py-2 text-sm rounded-sm bg-gray-700 cursor-pointer disabled:cursor-not-allowed disabled:bg-transparent disabled:text-gray-500`} onClick={()=> handleChangePage("prev")}  disabled={!hasPrev}  > <FaAngleLeft /> </button>
        <button className={`px-2 py-2 text-sm rounded-sm bg-gray-700 cursor-pointer disabled:cursor-not-allowed disabled:bg-transparent disabled:text-gray-500`} onClick={()=> handleChangePage("next")} disabled={!hasNext}  > <FaAngleRight /> </button>
    </div>
  )
}

export default Pagination