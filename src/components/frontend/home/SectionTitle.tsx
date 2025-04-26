import Link from 'next/link'
import React from 'react'

const SectionTitle = ({title, link}: {title: string, link: string}) => {
  return (
    <div className="flex items-center justify-between mb-2">
      <h2> {title} </h2>
      <Link href={`/category/${link}`} className="text-sm hover:text-gray-600 font-semibold"> View All </Link>
    </div>
  )
}

export default SectionTitle
