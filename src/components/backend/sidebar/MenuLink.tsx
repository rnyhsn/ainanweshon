'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IconType } from 'react-icons'

const MenuLink = ({menu}: {menu: {title: string, path: string, icon: IconType}}) => {
    const pathname = usePathname();
    const Icon = menu.icon;
  return (
    <Link href={menu.path} className={`px-4 py-2 flex items-center gap-2 font-semibold text-lg hover:bg-orange-600 rounded-l-full ${pathname === menu.path && 'bg-orange-600'} `}>
        <Icon /> {menu.title}
    </Link>
  )
}

export default MenuLink
