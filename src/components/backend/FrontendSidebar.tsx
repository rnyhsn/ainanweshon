import { getSidebarLatest, getSidebarPopular } from '@/utils/action/article'
import React from 'react'
import FrontSidebar from './FrontSidebar';

const FrontendSidebar = async () => {
    const popular = await getSidebarPopular();
    const latest = await getSidebarLatest();
  return (
    <div className="flex-1 hidden lg:block">
        <FrontSidebar latest={latest} popular={popular} />
    </div>
  )
}

export default FrontendSidebar