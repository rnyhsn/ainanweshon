import Link from 'next/link'
import React from 'react'

const EmptyList = ({text, link}: {text: string, link?: string}) => {
  return (
    <div className="flex flex-col gap-4 mt-[250px]">
      <h1 className="text-4xl font-semibold text-center text-gray-300"> {text} </h1>
      <Link href={`/dashboard${link}`} className="bg-blue-600 hover:bg-blue-600/95 w-max py-2 px-8 rounded-sm mx-auto"> Add New </Link>
    </div>
  )
}

export default EmptyList
