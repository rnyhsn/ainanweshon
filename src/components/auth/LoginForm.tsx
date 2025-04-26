'use client';

import { doCredentialLogin } from "@/utils/action/user";
import { redirect } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";


const LoginForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const handleLoginSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const resp = await doCredentialLogin(formData);
    
    if(!resp?.success && resp?.statusCode === 422) {
        setErrors(resp.payload);
    } else if(!resp.success && resp.statusCode === 404) {
      setError(resp.message);
    } else if(resp.success && resp.statusCode === 200) {
      toast.success(resp.message);
      redirect('/');
    }
  }

  return (
    <form onSubmit={handleLoginSubmit}  className="font-semibold text-sm flex flex-col gap-3">
        <div className="flex flex-col gap-0.5">
            <label>E-mail</label>
            <input type="email" name="email" className="py-1.5 px-3 rounded-sm bg-white outline-none border-gray-400 focus:ring ring-blue-500" />
            { errors.email && <small className="text-red-600 font-semibold"> {errors.email[0]} </small> }
        </div>
        <div className="flex flex-col gap-0.5">
            <label>Password</label>
            <input type="password" name="password" className="py-1.5 px-3 rounded-sm bg-white outline-none border-gray-400 focus:ring ring-blue-500" />
            { errors.password && <small className="text-red-500 font-semibold"> {errors.password[0]} </small> }
            {error && <small className="text-red-500 font-semibold"> {error} </small> }
        </div>
        <button className="py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-600/90 cursor-pointer">Login</button>
      </form>
  )
}

export default LoginForm
