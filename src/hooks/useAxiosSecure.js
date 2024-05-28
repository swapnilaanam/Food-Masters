import axios from "axios";
import useAuth from "./useAuth"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const axiosSecure = axios.create({
    baseURL: 'https://food-masters-server-production.up.railway.app'
});

const useAxiosSecure = () => {
    const router = useRouter();

    const { signOutUser} = useAuth();

    useEffect(() => {
        axiosSecure.interceptors.request.use((config) => {
            const accessToken = localStorage.getItem('access-token');

            if(accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }

            return config;
        });

        axiosSecure.interceptors.response.use(
        (response) => response,
        (error) => {
            if(error?.response && (error?.response?.status === 401 || error?.response?.status === 403)) {
                signOutUser()
                .then(() => {
                    router.push('/signin');
                })
            }
            return Promise.reject(error);
        }
        )
    }, [router, signOutUser]);

    return [axiosSecure];
};

export default useAxiosSecure;