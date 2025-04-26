import DashBoardHeader from '@/components/backend/header/Header'
import DashboardSidebar from '@/components/backend/sidebar/Sidebar'
import { ReactNode } from 'react'

const BackendLayout = ({children}: {children: ReactNode}) => {
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
