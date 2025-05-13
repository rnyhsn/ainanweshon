import AuthLogin from '@/components/auth/AuthLogin'
import LoginForm from '@/components/auth/LoginForm'
import Link from 'next/link'
import React from 'react'

const LoginPage = () => {
  return (
    <div className="w-screen h-screen bg-black/50 flex items-center justify-center">
      <div className="w-[80%] lg:w-[28%] mx-auto bg-gray-200 rounded-md px-8 py-8">
        <h1 className="text-center font-bold">Login</h1>
        <LoginForm />
        <p className="text-sm font-semibold mt-1">Don't have any account? <Link href={'/register'} className="text-blue-700">Register</Link> </p>
        <div className="flex items-center gap-2 font-semibold text-sm py-2">
            <div className="border-b border-gray-500 w-[45%]" />
            OR
            <div className="border-b border-gray-500 w-[45%]" />
        </div>
        <AuthLogin />
      </div>
    </div>
  )
}

export default LoginPage

