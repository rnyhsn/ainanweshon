"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";
import { FaSearch } from "react-icons/fa";
import { useDebouncedCallback } from 'use-debounce';
const SearchSort = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();
  console.log(searchParams);
  console.log(pathname)



  const params = new URLSearchParams(searchParams);
  const handleChange = useDebouncedCallback((e:ChangeEvent<HTMLInputElement>) => {
    params.set('page', String(1));
    if(e.target.value) {
      e.target.value.length > 2 &&
      params.set('q', e.target.value);
    } else {
      params.delete('q');
    }

    replace(`${pathname}?${params}`);
  }, 500);
  return (
    <div className="py-2 px-4 rounded-md flex items-center justify-between bg-gray-900 mb-3">
      <div className="rounded-sm bg-gray-950 flex items-center pl-3 pr-2 py-1">
        <input type="text" name="search" onChange={handleChange} placeholder="Search..." className=" outline-none" />
        <FaSearch />
      </div>
      <div>

      </div>
    </div>
  )
}

export default SearchSort
