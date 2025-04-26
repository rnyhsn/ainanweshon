import React from 'react'
import SectionTitle from './SectionTitle'
import ArticleCard from '../ArticleCard'
import { getArticlesByCategorySlug } from '@/utils/action/article';


const Career = async () => {
  const resp:any = await getArticlesByCategorySlug('ল-ক্যারিয়ার্স');
  return (
    <div className="px-10 bg-blue-100 py-6">
          <SectionTitle title="ক্যারিয়ার্স" link="ল-ক্যারিয়ার্স"  />
          <div className="grid grid-cols-4 gap-4">
          {
            resp.success && resp.statusCode === 200 && resp.payload.map((article: any, i: number) => (
                i < 8 && <ArticleCard  article={article} key={i} />
            ))
          }
          </div>
        </div>
  )
}

export default Career