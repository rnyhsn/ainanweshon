import DeleteTesk from '@/components/backend/body/DeleteTesk';
import PageTitle from '@/components/backend/body/PageTitle'
import { getComments } from '@/utils/action/comment'
import Link from 'next/link';
import { FaRegEdit } from 'react-icons/fa';

const CommentDashboardPage = async () => {
  const resp = await getComments();

  return (
    <div>
      <PageTitle title="Comments List" />
      <div className="p-6 bg-gray-900 rounded-sm">
        <table className="w-full text-left text-sm">
          <thead className=" bg-gray-950">
            <tr>
              <th className="py-1.5 pl-2"> S.N </th>
              <th> Name </th>
              <th> E-mail </th>
              <th> Comment </th>
              <th> Status </th>
              <th> Action </th>
            </tr>
          </thead>
          <tbody>
          {
            resp.success && resp.statusCode && resp.payload.map((comment: any, i: number) => (
              <tr key={i} className="even:bg-gray-950">
                <td className="px-2 py-1.5"> {i+1} </td>
                <td> {comment.name} </td>
                <td> {comment.email} </td>
                <td className="italic"> {comment.comment} </td>
                <td className={`text-xs ${comment.publishStatus === 'PENDING' ? "text-red-500" : "text-blue-500" }`}> {comment.publishStatus} </td>
                <td className="flex gap-2 pt-1">
                  <Link href={`/dashboard/comment/${comment._id}`}> <FaRegEdit className="text-lg text-blue-600" />  </Link>
                  <DeleteTesk id={comment._id.toString()} model='comment' />
                </td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CommentDashboardPage
