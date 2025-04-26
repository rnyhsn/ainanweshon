import FrontendSidebar from '@/components/backend/FrontendSidebar';
import { getArticleByCategory } from '@/utils/action/article'
import Image from 'next/image';
import Link from 'next/link';
import ArticleCard from '../ArticleCard';


const Featured = async () => {
    const resp = await getArticleByCategory('featured');
    
  return (
    <div className="flex w-full px-10 mt-5 gap-6">
      {/* Featured Image Section */}
      {
        resp.success && resp.statusCode === 200 ? (
        <div className="grid grid-cols-3 flex-[2.7] gap-2">
            <Link href={`/article/${resp.payload[0]?.slug || ""}`} className="col-span-2 row-span-2 bg-white">
                <div  className="relative w-full h-80">
                {
                    resp.payload[0]?.image_url &&
                    <Image src={resp.payload[0].image_url} alt="" className="object-cover" fill />
                }
                </div>
                <div className="px-4 py-2">
                    <h3> {resp.payload[0]?.articleTitle} </h3>
                </div>
            </Link>
            <ArticleCard article={resp.payload[1]} />
            <ArticleCard article={resp.payload[2]} />
            <ArticleCard article={resp.payload[3]} />
            <ArticleCard article={resp.payload[4]} />
            <ArticleCard article={resp.payload[5]} />
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
