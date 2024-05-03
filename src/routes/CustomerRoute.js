'use client';

import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import useAuth from "@/hooks/useAuth";
import useIsCustomer from "@/hooks/useIsCustomer";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Swal from "sweetalert2";

const CustomerRoute = ({ children }) => {
    const { signOutUser } = useAuth();
    const { isCustomer, isCustomerLoading } = useIsCustomer();

    const router = useRouter();
    const pathName = usePathname();

    useEffect(() => {
        if(!isCustomerLoading && isCustomer === false) {
            localStorage.setItem('masterHistory', pathName);
            Swal.fire('Login With Your Customer Account To Use This Feature!');
            signOutUser();
            return router.push('/signin');
        }

        if(!isCustomerLoading && isCustomer) {
            localStorage.removeItem('masterHistory');
        }

    }, [isCustomer, isCustomerLoading, pathName, router, signOutUser]);


    if (isCustomerLoading) {
        return <LoadingSpinner />
    }

    if (!isCustomerLoading && isCustomer === true) {
        return children;
    }
}

export default CustomerRoute;