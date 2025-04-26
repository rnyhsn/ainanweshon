import ArticleUpdateForm from '@/components/backend/body/article/ArticleUpdateForm'
import EmptyList from '@/components/backend/body/EmptyList'
import PageTitle from '@/components/backend/body/PageTitle'
import { getArticle } from '@/utils/action/article'

import { getCategories } from '@/utils/action/category'
import { notFound } from 'next/navigation'
import React from 'react'

const UpdateArticlePage = async ({params}: {params: Promise<{id: string}>}) => {
  const {id} = await params;
  const resp = await getArticle(id);

  const catResp = await getCategories();

  if(!resp.success && resp.statusCode === 404) {
    return notFound();
  }

  if(!catResp.success && catResp.statusCode === 404) {
    return <EmptyList text={catResp.message} link='/category/add' />
  }
  // console.log("article: ", article);

  return (
    <div>
      <PageTitle title="Update Article" />
      <ArticleUpdateForm item={resp.payload} fetchedCats={catResp.payload} />
    </div>
  )
}

export default UpdateArticlePage
