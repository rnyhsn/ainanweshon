import { getArticleBySlug } from '@/utils/action/article';
import Image from 'next/image';
import parse from 'html-react-parser';
import CommentForm from '@/components/frontend/CommentForm';
import FrontendSidebar from '@/components/backend/FrontendSidebar';
import { getArticleComments } from '@/utils/action/comment';



const SingleArticlePage = async ({params}: {params: Promise<{slug: string}>}) => {
    const {slug} = await params;
    const resp = await getArticleBySlug(slug);
    if(!resp.success && resp.statusCode === 404) {
        return <h1 className="px-4 lg:px-10 mt-5 font-bold"> {resp.message} </h1>
    }
    const commentsResp = await getArticleComments(resp.payload._id);
    console.log("Comments: ", commentsResp)
  return (
    <div className="flex gap-4 px-4 lg:px-10 mt-5 w-full">
      {/* Single Post Section */}
      <div className="lg:flex-[2.5] w-full">
        {/* Post Section */}
        <div className="px-3 lg:px-10 rounded-sm bg-white py-8 line-">
            <h2 className="text-xl"> {resp.payload.articleTitle} </h2>
            <div className="relative  lg:w-full h-40 sm:h-80 mt-2 mb-5">
                <Image src={resp.payload.image_url} alt="" fill className="object-cover" />
            </div>
            <div className="">
                { parse(resp.payload.content) }
                {/* {resp.payload.content} */}
            </div>
        </div>

        {/* Comment Section */}
        <div className="bg-white rounded-sm px-4 lg:px-20 py-5 mt-6">
            <h2 className="text-3xl text-gray-600 mb-5">Leave a Comment Here</h2>
            <CommentForm id={resp.payload._id.toString()} />
            <div className="mt-6">
              <h2>Article Comments</h2>
              <div className="flex flex-col gap-4 mt-3">

              {
                commentsResp.statusCode === 200 && commentsResp.payload.map((comment: any, i: number) => (
                  <div key={i} className="flex gap-2 flex-co">
                    <Image src="/avatar.jpg" alt="" width={40} height={40} className="rounded-full h-10 w-10" />
                    <div>
                      <h3> {comment.name} </h3>
                      <p>  {comment.comment} </p>
                    </div>
                  </div>
                ))
              }
              </div>
            </div>
        </div>
      </div>


      {/* Sidebar Section */}
      <FrontendSidebar />
    </div>
  )
}

export default SingleArticlePage
