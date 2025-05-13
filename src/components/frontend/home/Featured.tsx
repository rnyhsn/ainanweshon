import FrontendSidebar from '@/components/backend/FrontendSidebar';
import { getArticleByCategory } from '@/utils/action/article'
import Image from 'next/image';
import Link from 'next/link';
import ArticleCard from '../ArticleCard';


const Featured = async () => {
    const resp = await getArticleByCategory('featured', 6);
    
  return (
    <div className="flex w-full px-4  xl:px-10 mt-5 gap-6">
      {/* Featured Image Section */}
      {
        resp.success && resp.statusCode === 200 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 flex-1 lg:flex-[2.7] gap-2">
            <Link href={`/article/${resp.payload[0]?.slug || ""}`} className="col-span-2 md:col-span-2 row-span-2 bg-white">
                <div  className="relative w-full h-56 md:h-96  lg:h-72 xl:h-96">
                {
                    resp.payload[0]?.image_url &&
                    <Image src={resp.payload[0].image_url} alt="" className="object-cover" fill />
                }
                </div>
                <div className="px-4 py-2">
                    <h3> {resp.payload[0]?.articleTitle} </h3>
                    <button className="text-xs md:text-sm border border-gray-700 rounded-sm px-3 mt-1 md:mt-2 hover:bg-gray-700 hover:text-white py-1 cursor-pointer font-semibold">Read More</button>
                </div>
            </Link>
            <ArticleCard article={resp.payload[1]} />
            <ArticleCard article={resp.payload[2]} />
            <ArticleCard article={resp.payload[3]} />
            <ArticleCard article={resp.payload[4]} />
            <div className="hidden md:block bg-white">
              <ArticleCard article={resp.payload[5]} />
            </div>
        </div>
        ): (
            <h1> {resp.message} </h1>
        )
      }

      {/* Sidebar Bar Section */}
      <FrontendSidebar />
    </div>
  )
}

export default Featured
