'use client';

import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import axios from "axios";

const useIsOwner = () => {
    const { user, loading } = useAuth();

    const { data: isOwner, isLoading: isOwnerLoading } = useQuery({
        queryKey: ['isOwner', user?.email],
        queryFn: async () => {
            try {
                const response = await axios.get(`https://food-masters-server-production.up.railway.app/restaurants/${user?.email}`);

                if (response?.data) {
                    return true;
                }
                else {
                    return false;
                }
            } catch (error) {
                console.log(error?.message);
            }
        }
    });

    return [isOwner, isOwnerLoading];

}

export default useIsOwner;