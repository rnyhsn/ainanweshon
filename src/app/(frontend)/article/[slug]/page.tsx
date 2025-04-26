import { getArticleBySlug } from '@/utils/action/article';
import Image from 'next/image';
import parse from 'html-react-parser';
import CommentForm from '@/components/frontend/CommentForm';
import FrontendSidebar from '@/components/backend/FrontendSidebar';



const SingleArticlePage = async ({params}: {params: Promise<{slug: string}>}) => {
    const {slug} = await params;
    const resp = await getArticleBySlug(slug);
    if(!resp.success && resp.statusCode === 404) {
        return <h1> {resp.message} </h1>
    }
  return (
    <div className="flex gap-4 px-10 mt-5">
      {/* Single Post Section */}
      <div className="flex-[2.5]">
        {/* Post Section */}
        <div className="px-10 rounded-sm bg-white py-8">
            <h2> {resp.payload.articleTitle} </h2>
            <div className="relative w-full h-80 mt-2 mb-5">
                <Image src={resp.payload.image_url} alt="" fill className="object-cover" />
            </div>
            <div>
                { parse(resp.payload.content) }
                {/* {resp.payload.content} */}
            </div>
        </div>

        {/* Comment Section */}
        <div className="bg-white rounded-sm px-20 py-5 mt-6">
            <h2 className="text-3xl text-gray-600 mb-5">Leave a Comment Here</h2>
            <CommentForm id={resp.payload._id.toString()} />
        </div>
      </div>


      {/* Sidebar Section */}
      <FrontendSidebar />
    </div>
  )
}

export default SingleArticlePage
