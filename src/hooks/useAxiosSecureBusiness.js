import axios from "axios";
import useAuth from "./useAuth"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const axiosSecureBusiness = axios.create({
    baseURL: 'https://food-masters-server-production.up.railway.app'
});

const useAxiosSecureBusiness = () => {
    const router = useRouter();

    const { signOutUser} = useAuth();

    useEffect(() => {
        axiosSecureBusiness.interceptors.request.use((config) => {
            const accessToken = localStorage.getItem('access-token');

            if(accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }

            return config;
        });

        axiosSecureBusiness.interceptors.response.use(
        (response) => response,
        (error) => {
            if(error?.response && (error?.response?.status === 401 || error?.response?.status === 403)) {
                signOutUser()
                .then(() => {
                    router.push('/business/signin');
                })
            }
            return Promise.reject(error);
        }
        )
    }, [router, signOutUser]);

    return [axiosSecureBusiness];
};

export default useAxiosSecureBusiness;