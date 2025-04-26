import EmptyList from '@/components/backend/body/EmptyList';
import PageTitle from '@/components/backend/body/PageTitle'
import { getCategories } from '@/utils/action/category'
import Link from 'next/link';
import { FaTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import DeleteTesk from '@/components/backend/body/DeleteTesk';


const CategoryDashboardPage = async () => {
  const resp = await getCategories();
  if(resp.success && resp.statusCode === 204) {
    return <EmptyList text={resp.message} link='/category/add' />
  }

  if(resp.success && resp.statusCode === 200) {
    return (
      <div>
        <PageTitle title="Categories" link="/category/add" />
        <div className="bg-gray-900 rounded-sm p-8">
          <table className="w-full text-left text-sm">
            <thead>
              <tr>
                <th> S.N </th>
                <th> Name </th>
                <th> Slug </th>
                <th> Parent </th>
                <th> Action </th>
              </tr>
            </thead>
            <tbody>
            {
              resp.payload.map((category: any, i: number) => (
                <tr key={i} className="odd:bg-gray-950">
                  <td className="py-1 px-2"> {i+1} </td>
                  <td> {category.name} </td>
                  <td> {category.slug} </td>
                  <td> {category.parent ? category.parent.name : '-'} </td>
                  <td className="flex items-center gap-1.5 py-0.5">
                    <Link href={`/dashboard/category/${category._id}`}> <FaRegEdit className="text-lg text-blue-600" /> </Link>
                    <DeleteTesk id={category._id} model='category' />
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
}

export default CategoryDashboardPage
