import ArticleForm from '@/components/backend/body/article/ArticleForm'
import EmptyList from '@/components/backend/body/EmptyList'
import PageTitle from '@/components/backend/body/PageTitle'
import { getCategories } from '@/utils/action/category'
import { auth } from '@/utils/auth'
import React from 'react'

const AddArticlePage = async () => {

  const session = await auth();
      
  
      const user = {
          firstName: "",
          lastName: "",
          email: ""
      }
  
      const names = session?.user?.name?.split(" ");
      if(names && names.length > 2) {
          user.firstName = `${names[0]} ${names[1]}`;
          user.lastName = `${names[2]}`;
      } else if (names && names.length === 2) {
          user.firstName = names[0];
          user.lastName = names[1];
      }
      user.email = session?.user?.email || "";

  const resp = await getCategories();

  if(resp.success && resp.statusCode === 204) {
    return <EmptyList text={resp.message} link='/category/add' />
  }
  return (
    <div>
      <PageTitle title="Add Article" />
      <ArticleForm cats={resp.payload} user={user} />
    </div>
  )
}

export default AddArticlePage
