'use client';

import Navbar from "@/components/Shared/Navbar";
import useAuth from "@/hooks/useAuth";
import useIsOwner from "@/hooks/useIsOwner";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const WithNavbarLayout = ({ children }) => {
  const [isOwner, isOwnerLoading] = useIsOwner();
  const { signOutUser } = useAuth();

  const pathName = usePathname();

  useEffect(() => {
    if ((!isOwnerLoading && isOwner) && (pathName === '/' || pathName === '/restaurant' || pathName === '/cart')) {
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