import UpdateCommentForm from '@/components/backend/body/comment/UpdateCommentForm'
import PageTitle from '@/components/backend/body/PageTitle'
import { getComment } from '@/utils/action/comment'
import { notFound } from 'next/navigation'
import React from 'react'

const UpdateCommentPage = async ({params}: {params: Promise<{id: string}>}) => {
  const {id} = await params;
  const resp = await getComment(id);
  console.log(resp);
  // if(!resp.success && resp.statusCode === 404) {
  //   return notFound();
  // }
  return (
    <div>
      <PageTitle title="Update Comment" />
      <UpdateCommentForm comment={resp.payload[0]} />
    </div>
  )
}

export default UpdateCommentPage
