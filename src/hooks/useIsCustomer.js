'use client';
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import axios from "axios";

const useIsCustomer = () => {
    const { user, loading: userLoading } = useAuth();

    const { data: isCustomer, loading: isCustomerLoading } = useQuery({
        queryKey: ['isCustomer', user?.email],
        queryFn: async () => {
            try {
                if (!userLoading) {
                    const response = await axios.get(`http://localhost:4000/users/${user?.email}`);

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

    return [isCustomer, isCustomerLoading];

}

export default useIsCustomer;