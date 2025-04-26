import { logout } from '@/utils/action/user';
import { RiLogoutCircleLine } from 'react-icons/ri';

const LogoutBtn = async () => {
  return (
    <form action={logout} >
        <button className="font-semibold text-sm bg-gray-600 px-4 py-1.5 rounded-sm flex items-center gap-2 cursor-pointer">
        <RiLogoutCircleLine /> Logout
        </button>
    </form>
  )
}

export default LogoutBtn
