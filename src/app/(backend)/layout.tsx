import DashBoardHeader from '@/components/backend/header/Header'
import ProtectedBackend from '@/components/backend/ProtectedBackend';
import DashboardSidebar from '@/components/backend/sidebar/Sidebar'
import { isAdmin } from '@/utils/action/user';
import { redirect } from 'next/navigation';

import { ReactNode } from 'react'

const BackendLayout = async ({children}: {children: ReactNode}) => {
  const admin = await isAdmin();
  console.log("")
  if(!admin) {
    redirect("/");
  }
  return (
      <div className="flex bg-gray-950 text-white">
        <DashboardSidebar />
        <div className="w-4/5 p-5 overflow-auto ml-[20%] min-h-screen">
          <DashBoardHeader />
          <div>
            {children}
          </div>
        </div>
      </div>
  )
}

export default BackendLayout
