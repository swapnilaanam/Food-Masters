'use client';

import Navbar from "@/components/Shared/Navbar";
import useAuth from "@/hooks/useAuth";
import useIsOwner from "@/hooks/useIsOwner";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const WithNavbarLayout = ({ children }) => {
  const { signOutUser } = useAuth();
  const [isOwner, isOwnerLoading] = useIsOwner();

  const pathName = usePathname();

  useEffect(() => {
    if ((!isOwnerLoading && isOwner) && (pathName === '/' || pathName === '/restaurants' || pathName === '/cart')) {
      signOutUser();
    }
  }, [isOwner, isOwnerLoading, pathName, signOutUser]);

  return (
    <>
      <header>
        <Navbar />
      </header>
      {children}
    </>

  )
}

export default WithNavbarLayout;