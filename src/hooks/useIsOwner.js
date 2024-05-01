'use client';

import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import axios from "axios";

const useIsOwner = () => {
    const { user, loading: userLoading } = useAuth();

    const { data: isOwner, loading: isOwnerLoading } = useQuery({
        queryKey: ['isOwner', user?.email],
        queryFn: async () => {
            try {
                if (!userLoading) {
                    const response = await axios.get(`http://localhost:4000/restaurants/${user?.email}`);

                    if (response?.data) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            } catch (error) {
                console.log(error?.message);
            }
        }
    });

    return [isOwner, isOwnerLoading];

}

export default useIsOwner;