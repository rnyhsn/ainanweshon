import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ArticleCard = ({article, css}: {article: any, css?: string}) => {
  return (
    <Link href={`/article/${article.slug}`} className={`bg-white ${css}`} key={article._id}>
        <div className="relative w-full h-[150px]">
        {
            article.image_url &&
            <Image src={article.image_url} alt="" fill className="object-cover" />
        }
        </div>
        <div className="py-3 px-4">
            <h5> {article.articleTitle} </h5>
        </div>
    </Link>
  )
}

export default ArticleCard