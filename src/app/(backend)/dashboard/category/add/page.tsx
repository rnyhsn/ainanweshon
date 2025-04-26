import AddCategoryForm from '@/components/backend/body/category/AddCategoryForm'
import PageTitle from '@/components/backend/body/PageTitle'
import { getCategories } from '@/utils/action/category'
import React from 'react'

const CategoryAddPage = async () => {
  const catResp = await getCategories();
  const categories = catResp.payload;
  return (
    <div>
        <PageTitle title="Add New Category" />

        <AddCategoryForm categories={categories} />
    </div>
  )
}

export default CategoryAddPage
