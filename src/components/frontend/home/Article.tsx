import { getArticleByCategory } from '@/utils/action/article'

import SectionTitle from './SectionTitle';
import ArticleCard from '../ArticleCard';

const Article = async () => {

    const resp = await getArticleByCategory('আর্টিকেলস', 4);

  return (
    <div className="bg-blue-100 py-6 px-4 lg:px-10">
      <SectionTitle title="আর্টিকেলস" link="আর্টিকেলস"  />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
      {
        resp.success && resp.statusCode === 200 && resp.payload.map((article: any, i: number) => (
            i < 4 && <ArticleCard article={article} key={i} />
        ))
      }
      </div>
    </div>
  )
}

export default Article
