import Link from 'next/link'
import React from 'react'

const PageTitle = ({title, link}: {title: string, link?: string}) => {
  return (
    <div className="flex items-center justify-between bg-gray-900 rounded-md p-4 mb-4">
      <h2 className="font-semibold text-2xl"> {title} </h2>
      {
        link && <Link href={`/dashboard${link}`} className="bg-blue-500 rounded-sm px-5 py-2 font-semibold"> Add New </Link>
      }
    </div>
  )
}

export default PageTitle
