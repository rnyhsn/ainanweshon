import Footer from '@/components/frontend/footer/Footer'
import Header from '@/components/frontend/header/Header'
import { ReactNode } from 'react'

const FrontendLayout = ({children}: {children: ReactNode}) => {
  return (
    <div className="text-black bg-gray-100 overflow-x-hidden flex flex-col justify-between min-h-screen">
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default FrontendLayout
