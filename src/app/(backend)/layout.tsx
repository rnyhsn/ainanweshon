import DashBoardHeader from '@/components/backend/header/Header'
import ProtectedBackend from '@/components/backend/ProtectedBackend';
import DashboardSidebar from '@/components/backend/sidebar/Sidebar'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

const BackendLayout = ({children}: {children: ReactNode}) => {
  return (
    <SessionProvider>
      <ProtectedBackend>
      <div className="flex bg-gray-950 text-white">
        <DashboardSidebar />
        <div className="w-4/5 p-5 overflow-auto ml-[20%] min-h-screen">
          <DashBoardHeader />
          <div>
            {children}
          </div>
        </div>
      </div>
      </ProtectedBackend>
    </SessionProvider>
  )
}

export default BackendLayout
