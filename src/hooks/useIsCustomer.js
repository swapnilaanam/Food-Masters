'use client';
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import axios from "axios";

const useIsCustomer = () => {
    const { user, loading } = useAuth();

    const { data: isCustomer, isLoading: isCustomerLoading } = useQuery({
        queryKey: ['isCustomer', user?.email],
        queryFn: async () => {
            try {
                const response = await axios.get(`https://food-masters-server.vercel.app/users/${user?.email}`);
                // console.log(loading, user?.email, response?.data);

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

    return [isCustomer, isCustomerLoading];

}

export default useIsCustomer;