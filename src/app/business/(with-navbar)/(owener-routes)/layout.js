'use client';

import LoadingSpinner from '@/components/Shared/LoadingSpinner';
import useAuth from '@/hooks/useAuth';
import useIsOwner from '@/hooks/useIsOwner';
import { usePathname, useRouter } from 'next/navigation';

import { useEffect } from 'react';
import { toast } from 'react-toastify';

const OwnerRoutesLayout = ({children}) => {
    const { signOutUser } = useAuth();
    const [isOwner, isOwnerLoading] = useIsOwner();

    const router = useRouter();
    const pathName = usePathname();

    const logOutTheUser = async () => {
        await signOutUser();
    };

    useEffect(() => {
        if (!isOwnerLoading && isOwner === false) {
            localStorage.setItem('masterBusinessHistory', pathName);
            toast.error('Login With Your Customer Account To Use This Feature!');
            logOutTheUser();
            return router.push('/business/signin');
        }

        if (!isOwnerLoading && isOwner) {
            localStorage.removeItem('masterBusinessHistory');
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOwner, isOwnerLoading, pathName, router, signOutUser]);

    if (isOwnerLoading) {
        return <LoadingSpinner />;
    }

    return children;
}

export default OwnerRoutesLayout;