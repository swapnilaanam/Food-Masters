'use client';

import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import useAuth from "@/hooks/useAuth";
import useIsCustomer from "@/hooks/useIsCustomer"
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Swal from "sweetalert2";

const CustomerRoutesLayout = ({ children }) => {
    const {signOutUser} = useAuth();
    const [isCustomer, isCustomerLoading] = useIsCustomer();

    const router = useRouter();
    const pathName = usePathname();

    const logOutTheUser = async() => {
        await signOutUser();
    }

    useEffect(() => {
        if(!isCustomerLoading && isCustomer === false) {
            localStorage.setItem('masterHistory', pathName);
            Swal.fire('Login With Your Customer Account To Use This Feature!');
            logOutTheUser();
            return router.push('/signin');
        }

        if(!isCustomerLoading && isCustomer) {
            localStorage.removeItem('masterHistory');
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCustomer, isCustomerLoading, pathName, router, signOutUser]);

    if (isCustomerLoading) {
        return <LoadingSpinner />;
    }

    return children;
}

export default CustomerRoutesLayout;