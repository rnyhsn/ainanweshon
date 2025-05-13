import Image from 'next/image'
import Link from 'next/link'
import parse from 'html-react-parser';

const ArticleCard = ({article, css}: {article: any, css?: string}) => {
  return (
    <Link href={`/article/${article?.slug}`} className={`bg-white ${css}`} key={article._id}>
        <div className="relative w-full h-[100px]  md:h-[150px]">
        {
            article.image_url &&
            <Image src={article.image_url} alt="" fill className="object-cover" />
        }
        </div>
        <div className="py-3 px-4">
            <h3 className="text-xs font-light md:font-semibold"> {article.articleTitle.slice(0, 60)}.... </h3>
            <button className="text-xs md:text-sm border border-gray-700 rounded-sm px-3 mt-1 md:mt-2 hover:bg-gray-700 hover:text-white py-1 cursor-pointer font-semibold">Read More</button>
        </div>
    </Link>
  )
}

export default ArticleCard