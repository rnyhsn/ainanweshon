import { signIn } from "@/utils/auth";
import { FcGoogle } from "react-icons/fc";


const AuthLogin = () => {
  return (
    <form action={async () => {
      'use server';
      await signIn('google', {redirectTo: '/'});
    }} className="w-full">
      <button className="py-2 px-4 bg-red-500 hover:bg-red-500/90 text-white rounded-sm cursor-pointer flex items-center gap-2 font-semibold w-full">
        <FcGoogle className="text-2xl" /> Login with Google
      </button>
    </form>
  )
}

export default AuthLogin
