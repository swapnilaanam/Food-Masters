'use client';

import LoadingSpinner from '@/components/Shared/LoadingSpinner';
import useAuth from '@/hooks/useAuth';
import useIsOwner from '@/hooks/useIsOwner';
import { usePathname, useRouter } from 'next/navigation';

import { useEffect } from 'react';
import Swal from 'sweetalert2';

const OwnerRoutesLayout = ({ children }) => {
    const { user, loading, signOutUser } = useAuth();
    const [isOwner, isOwnerLoading] = useIsOwner();

    const router = useRouter();
    const pathName = usePathname();

    useEffect(() => {
        if (!loading && !isOwnerLoading && isOwner === false) {
            localStorage.setItem('masterBusinessHistory', pathName);
            Swal.fire('Login With Your Business Account To Use This Feature!');
            signOutUser();
            return router.push('/business/signin');
        }

        if (!isOwnerLoading && isOwner) {
            localStorage.removeItem('masterBusinessHistory');
        }

    }, [isOwner, isOwnerLoading, loading, pathName, router, signOutUser]);

    if (loading || isOwnerLoading) {
        return <LoadingSpinner />;
    }

    if (!loading && user?.email && !isOwnerLoading && isOwner) {
        return children;
    }
}

export default OwnerRoutesLayout;