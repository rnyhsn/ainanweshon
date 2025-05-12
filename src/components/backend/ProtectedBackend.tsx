// "use client";
// import { useSession } from 'next-auth/react';
// import { redirect, usePathname, useRouter } from 'next/navigation';
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

const ProtectedBackend = ({children, isAdmin}: {children: ReactNode, isAdmin: boolean}) => {
    // const route = useRouter();
    // const pathname = usePathname();
    // const { data: session, status } = useSession();
    // console.log("session:", session);
    // console.log("status:", status);
    
    // useEffect(() => {
    //     if(status === 'loading') return;
    //     if(pathname.startsWith('/dashboard') && session?.user.role !== 'ADMIN') {
    //       route.push("/");
    //       // redirect("/");
    //     }
    // }, [route, status, pathname, session])
    if(!isAdmin) {
      redirect("/");
    }

  return (
    <> {children} </>
  )
}

export default ProtectedBackend