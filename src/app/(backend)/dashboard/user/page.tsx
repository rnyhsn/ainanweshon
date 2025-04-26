import DeleteTesk from '@/components/backend/body/DeleteTesk'
import PageTitle from '@/components/backend/body/PageTitle'
import Pagination from '@/components/backend/body/Pagination'
import SearchSort from '@/components/backend/body/SearchSort'
import { getUsers } from '@/utils/action/user'
import React from 'react'

const UserDashBoardPage = async ({searchParams}: {searchParams: Promise<{q: string, page: number}>}) => {

  const q = (await searchParams).q || "";
  // const page = Number((await searchParams).page) || 1;
  const page = (await searchParams).page || 1;
  const resp: any = await getUsers(q, page);
  return (
    <div>
      <PageTitle title="Users" link='/user/add' />
      <SearchSort />
      <div className="bg-gray-900 rounded-sm p-8">
        <table className="w-full text-left text-sm">
          <thead>
            <tr>
              <th>S.N</th>
              <th>Name</th>
              <th>E-mail</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {
            resp.success && resp.statusCode === 200 && resp.payload.map((user: any, i: number) => (
              <tr key={i} className="odd:bg-gray-950">
                <td className="px-2 py-1"> {i+1} </td>
                <td> {user.name} </td>
                <td> {user.email} </td>
                <td className="text-xs"> {!user.role ? "USER" : user.role} </td>
                <td>
                  <DeleteTesk id={user._id.toString()} model='user' />
                </td>
              </tr>
            ))
          }
            <tr>
              <td></td>
            </tr>
          </tbody>
        </table>
        {
          resp?.count &&
          <Pagination count={resp?.count} />
        }
      </div>
    </div>
  )
}

export default UserDashBoardPage
