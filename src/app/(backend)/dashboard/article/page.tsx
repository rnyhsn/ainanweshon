import DeleteTesk from '@/components/backend/body/DeleteTesk';
import EmptyList from '@/components/backend/body/EmptyList';
import PageTitle from '@/components/backend/body/PageTitle'
import Pagination from '@/components/backend/body/Pagination';
import SearchSort from '@/components/backend/body/SearchSort';
import { getArticles } from '@/utils/action/article'

import Link from 'next/link';
import React from 'react'
import { FaRegEdit } from 'react-icons/fa';

const ArticleDashboardPage = async ({searchParams}: {searchParams: Promise<{q: string, page: number}>}) => {
  const q = (await searchParams).q;
  const page = (await searchParams).page || 1
  const resp: any = await getArticles(q, page);

  // if(resp.success && resp.statusCode === 404) {
  //   return <EmptyList text={resp.message} link='/article/add' />
  // }

  return (
    <div>
      <PageTitle title="Articles" link='/article/add' />
      <SearchSort />
      <div className="p-8 bg-gray-900 rounded-sm">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-1 py-1">S.N</th>
              <th>Title</th>
              {/* <th>Categories</th> */}
              <th>Authors</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {
            resp.success && resp.payload?.length > 0 && resp.payload?.map((article: any, i:number) => (
              <tr key={i} className="even:bg-gray-950 text-xs">
                <td className="py-1 pl-2"> {i+1} </td>
                <td className="px-1"> {article.articleTitle.slice(0, 80)} </td>
                {/* <td className="flex gap-2 px-1 py-1">
                {
                  article.categories.map((cat: {name: string, _id: string}) => (
                    <span key={cat._id} className="text-xs odd:text-blue-600 italic"> {cat.name} </span>
                  ))
                }
                </td> */}
                <td className='text-xs text-orange-500 px-1'>{article.title} {article.firstName} {article.lastName} </td>
                <td className={`text-xs px-1 ${article.publishStatus === 'PUBLISHED' ? "text-blue-600" : "text-red-600"}`}> {article.publishStatus} </td>
                <td className="flex items-center gap-1.5 py-0.5 px-1">
                  <Link href={`/dashboard/article/${article._id}`}> <FaRegEdit className="text-lg text-blue-600" /> </Link>
                  <DeleteTesk id={article._id.toString()} model='article' />
                </td>
              </tr>
            ))
          }
          </tbody>
        </table>
        <Pagination count={resp.count} />
      </div>
    </div>
  )
}

export default ArticleDashboardPage
