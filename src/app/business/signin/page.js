"use client";

import Lottie from 'lottie-react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

import authAnimation from '@/assets/animation/authAnimation.json';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import useAuth from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const SignIn = () => {
    const { user, loading, signInUser } = useAuth();

    const router = useRouter();

    const { data: customers } = useQuery({
        queryKey: ['customers'],
        queryFn: async () => {
            try {
                const response = await axios.get('https://food-masters-server-production.up.railway.app/users');

                if (response?.status === 200) {
                    return response?.data;
                }
            } catch (error) {
                console.log(error?.message);
            }
        }
    });

    useEffect(() => {
        if(!loading && user) {
          return router.push('/business/dashboard');
        }
      }, [loading, router, user]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = (data) => {
        const isExist = customers.find((customer) => customer?.email === data?.restaurantemail);

        if (isExist) {
            toast.error('This email is associated with a customer account!');
            return reset();
        }

        signInUser(data.restaurantemail, data.password)
            .then(result => {
                toast.success("Signed In Successfully!");
                reset();

                const masterBusinessHistory = localStorage.getItem('masterBusinessHistory');

                if(masterBusinessHistory) {
                    return router.push(masterBusinessHistory);
                }

                return router.push('/business/dashboard');
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    text: `${error?.message}`,
                });
            });
    };


    return (
        <main className="bg-orange-100 py-24 min-h-screen flex justify-center items-center px-4 2xl:px-0">
            <section className="max-w-7xl mx-auto lg:grid lg:grid-cols-12 bg-white">
                <div
                    className="flex items-center bg-green-100 lg:col-span-5 lg:h-full xl:col-span-6"
                >
                    <Lottie animationData={authAnimation} className="w-full" />
                </div>

                <div
                    className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
                >
                    <div className="w-[90%]">
                        <h1 className="text-center text-3xl text-green-600 font-semibold pb-5">
                            Food Masters
                            <span className="text-orange-500 ms-2"> For Business</span>
                        </h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid grid-cols-6 gap-6">
                            <div className="col-span-8">
                                <label htmlFor="restaurantemail" className="block text-base font-medium text-gray-700">
                                    Restaurant Email
                                </label>

                                <input
                                    type="email"
                                    id="restaurantemail"
                                    {...register("restaurantemail", { required: true })}
                                    className="mt-1 w-full h-8 rounded-sm border-2 border-gray-300 bg-white text-sm text-gray-700 shadow-sm ps-2"
                                    placeholder="Type Your Restaurant Name..."
                                />
                                {errors.restaurantemail && <span className="text-red-600 mt-2">** Restaurant Email is required</span>}
                            </div>

                            <div className="col-span-8">
                                <label htmlFor="password" className="block text-base font-medium text-gray-700">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    id="password"
                                    {...register("password", { required: true })}
                                    className="mt-1 w-full h-8 rounded-sm border-2 border-gray-300 bg-white text-sm text-gray-700 shadow-sm ps-2"
                                    placeholder="Type Your Password..."
                                />
                                {errors.password && <span className="text-red-600 mt-2">** Password is required</span>}
                            </div>

                            <div className="col-span-8 justify-center sm:flex sm:items-center sm:gap-4 text-center">
                                <button
                                    className="inline-block shrink-0 rounded-sm border border-green-600 bg-green-600 px-12 py-2.5 mt-2 text-base font-medium text-white transition hover:bg-green-700 focus:outline-none focus:ring active:text-green-600"
                                >
                                    Sign In
                                </button>
                            </div>
                        </form>
                        <div className="w-full mt-8">
                            <p className="mt-4 text-base text-gray-500 sm:mt-0">
                                {`Doesn't`} have an account?
                                <Link href="/business/signup" className="text-green-600 font-medium"> Sign Up</Link>.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default SignIn;