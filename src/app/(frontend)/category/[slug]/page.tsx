import FrontendSidebar from "@/components/backend/FrontendSidebar";
import ArticleCard from "@/components/frontend/ArticleCard";
import { getArticlesByCategorySlug } from "@/utils/action/article";


const CategoryPage = async ({params}: {params: Promise<{slug: string}>}) => {
    const {slug} = await params;
    const resp = await getArticlesByCategorySlug(slug);
    
    return (
      <div className="flex gap-4 px-4  md:px-10 mt-5">
        {/* Categories Section */}
         <div className="flex-[2.5]">
            <h2 className="mb-5"> <span className="text-purple-700"> ক্যাটেগরি </span> : {resp.message} </h2>
            <div className="grid grid-cols-2  md:grid-cols-3 gap-2 md:gap-4">
            {
              resp.success && resp.statusCode === 200 && resp.payload.map((article: any, i: number) => (
                  i < 8 && <ArticleCard  article={article} key={i} />
              ))
            }
            </div>
         </div>
  
        {/* Sidebar Section */}
        <FrontendSidebar />
      </div>
    )
  }
  
  export default CategoryPage
  
