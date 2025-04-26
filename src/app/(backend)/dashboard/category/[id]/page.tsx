import UpdateCategoryForm from '@/components/backend/body/category/UpdateCategoryForm';
import PageTitle from '@/components/backend/body/PageTitle'
import { getCategories, getCategoryById } from '@/utils/action/category'
import { notFound } from 'next/navigation';
import React from 'react'

const UpdateCategoryPage = async ({params}: {params: Promise<{id: string}>}) => {
    const {id} = await params;
    const resp = await getCategoryById(id);
    const catResp = await getCategories();
    const categories = catResp.payload;

    if(!resp.success && resp.statusCode === 404) {
        return notFound();
    }

  return (
    <div>
      
      <PageTitle title="Update Category" />
      <UpdateCategoryForm categories={categories} fieldValues={resp.payload} />
    </div>
  )
}

export default UpdateCategoryPage
