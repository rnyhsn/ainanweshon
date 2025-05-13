import React from 'react'
import SectionTitle from './SectionTitle'
import { getArticleByCategory } from '@/utils/action/article'
import Image from 'next/image';
import Link from 'next/link';
import ArticleCard from '../ArticleCard';

const Global = async () => {
    const national = await getArticleByCategory("জাতীয়", 5);
    const international = await getArticleByCategory("আন্তর্জাতিক", 5)
  return (
    <div className="px-4 lg:px-10 flex flex-col lg:flex-row gap-5">
        {/* National Section */}
      <div className="flex-[2.5] rounded-sm bg-white px-6 py-8">
        <SectionTitle title='জাতীয়' link="জাতীয়" />
        <div className="flex md:flex-row gap-3 justify-between flex-wrap h-max national">
        {
            national.success && national.statusCode === 200 && national.payload.map((article: any, i: number) => (
               i < 5 && <Link href={`/article/${article.slug}`} className="border border-gray-300 rounded-md" key={i}>
               <div className="relative w-full h-[120px]">
                   <Image src={article.image_url} alt="" className="object-cover" fill />
               </div>
               <p className="p-3  font-semibold text-xs">
                    {article.articleTitle}
               </p>
           </Link>
            ))
        }
        </div>
      </div>

        {/* International Section */}
      <div className="flex-1 bg-white rounded-sm px-6 py-8">
        <SectionTitle title="আন্তর্জাতিক" link="আন্তর্জাতিক" />
        <div className="flex flex-col gap-3 internation">
           {
            international.success && international.statusCode === 200 && international.payload.map((article: any, i: number) => (
               i < 5 && <Link href={`/article/${article.slug}`} className="border border-gray-300 flex gap-2" key={i}>
                
                    <Image src={article.image_url} alt="" width={100} height={60} className="w-[100px] h-[60px] object-cover" />
                
                <div className="p-2">
                    <h5> {article.articleTitle} </h5>
                </div>
            </Link>
              ))
          }
          
        </div>
      </div>
    </div>
  )
}

export default Global
