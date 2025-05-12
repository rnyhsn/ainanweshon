"use client";
import { useSession } from 'next-auth/react';
import { redirect, usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react'

const ProtectedBackend = ({children}: {children: ReactNode}) => {
    const route = useRouter();
    const pathname = usePathname();
    const { data: session, status } = useSession();
    console.log("session:", session);
    console.log("status:", status);
    
    useEffect(() => {
        if(status === 'loading') return;
        if(pathname.startsWith('/dashboard') && session?.user.role !== 'ADMIN') {
          route.push("/");
          // redirect("/");
        }
    }, [route, status, pathname, session])
  return (
    <> {children} </>
  )
}

export default ProtectedBackend