"use client";

import Lottie from 'lottie-react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import authAnimation from '@/assets/animation/authAnimation.json';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuth from '@/hooks/useAuth';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';


const SignUp = () => {
    const { signUpUser, updateUser, signOutUser } = useAuth();

    const { data: customers } = useQuery({
        queryKey: ['customers'],
        queryFn: async () => {
            try {
                const response = await axios.get('http://localhost:4000/users');

                if (response?.status === 200) {
                    return response?.data;
                }
            } catch (error) {
                console.log(error?.message);
            }
        }
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const router = useRouter();

    const onSubmit = (data) => {
        const isExist = customers.find((customer) => customer?.email === data?.restaurantemail);

        if(isExist) {
            toast.error('This email is associated with a customer account!');
            return reset();
        }

        if (data.password === data.passwordconfirm) {
            const formData = new FormData();
            formData.append('image', data.restaurantthumbnail[0]);

            const img_hosting_url = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_img_hosting_token}`;

            fetch(img_hosting_url, {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then(imgResponse => {
                    if (imgResponse.success) {
                        const imgURL = imgResponse.data.display_url;

                        signUpUser(data.restaurantemail, data.password)
                            .then(result => {
                                updateUser(data.restaurantname, imgURL)
                                    .then(() => {
                                        signOutUser()
                                            .then(() => {
                                                const newRestaurant = {
                                                    restaurantName: data.restaurantname,
                                                    restaurantEmail: data.restaurantemail,
                                                    restaurantThumbnail: imgURL,
                                                    restaurantPhoneNumber: '+88' + data.restaurantphone,
                                                    address: data.address,
                                                    city: data.city,
                                                    country: 'Bangladesh',
                                                    openingTime: data.openingtime,
                                                    closingTime: data.closingtime,
                                                    tags: []
                                                };

                                                axios.post('http://localhost:4000/restaurants', newRestaurant)
                                                    .then(res => {
                                                        if (res.status === 201) {
                                                            Swal.fire('You are signed up for food masters business successfully!');
                                                            reset();
                                                            router.push('/business/signin');
                                                        }
                                                    })
                                                    .catch(error => console.log(error));
                                            })
                                            .catch(error => console.log(error));
                                    })
                                    .catch(error => console.log(error));
                            })
                            .catch(error => {
                                Swal.fire({
                                    icon: 'error',
                                    text: `${error?.message}`,
                                });
                            });
                    }
                })
                .catch(error => console.log(error));
        }
        else {
            Swal.fire({
                icon: 'error',
                text: 'Password And Confirm Password Does Not Match',
            })
        }
    };

    return (
        <main className="bg-green-100 py-24 min-h-screen flex justify-center items-center px-4 lg:px-0">
            <section className="max-w-7xl mx-auto lg:grid lg:grid-cols-12 bg-white">
                <div
                    className="flex items-end bg-orange-200 lg:col-span-5 lg:h-full xl:col-span-6"
                >
                    <Lottie animationData={authAnimation} />
                </div>

                <main
                    className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
                >
                    <div className="max-w-xl lg:max-w-3xl">
                        <h1 className="text-center text-3xl text-green-600 font-semibold pb-5">
                            Food Masters
                            <span className="text-orange-500 ms-2"> For Business</span>
                        </h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid grid-cols-12 gap-6">
                            <div className="col-span-12 lg:col-span-6">
                                <label
                                    htmlFor="restaurantname"
                                    className="block text-base font-medium text-gray-700"
                                >
                                    Restaurant Name
                                </label>

                                <input
                                    type="text"
                                    id="restaurantname"
                                    {...register("restaurantname", { required: true })}
                                    className="mt-1 w-full h-8 rounded-sm border-2 border-gray-300 bg-white text-sm text-gray-700 shadow-sm ps-2"
                                    placeholder="Type Your Restaurant Name..."
                                />
                                {errors.restaurantname && <span className="text-red-600 mt-2">** Restaurant Name is required</span>}
                            </div>

                            <div className="col-span-12 lg:col-span-6">
                                <label
                                    htmlFor="restaurantthumbnail"
                                    className="block text-base font-medium text-gray-700"
                                >
                                    Restaurant Thumbnail
                                </label>

                                <input
                                    type="file"
                                    id="restaurantthumbnail"
                                    {...register("restaurantthumbnail", { required: true })}
                                    className="mt-1 w-full h-8 rounded-sm border-2 border-gray-300 bg-white text-sm text-gray-700 shadow-sm"
                                />
                                {errors.restaurantthumbnail && <span className="text-red-600 mt-2">** Restaurant Thumbnail is required</span>}
                            </div>

                            <div className="col-span-12">
                                <label htmlFor="restaurantemail" className="block text-base font-medium text-gray-700">
                                    Restaurant Email
                                </label>

                                <input
                                    type="email"
                                    id="restaurantemail"
                                    {...register("restaurantemail", { required: true })}
                                    className="mt-1 w-full h-8 rounded-sm border-2 border-gray-300 bg-white text-sm text-gray-700 shadow-sm ps-2"
                                    placeholder="Type Your Restaurant Email..."
                                />
                                {errors.restaurantemail && <span className="text-red-600 mt-2">** Restaurant Email is required</span>}
                            </div>

                            <div className="col-span-12 lg:col-span-6">
                                <label htmlFor="address" className="block text-base font-medium text-gray-700">
                                    Address:
                                </label>

                                <input
                                    type="text"
                                    id="address"
                                    {...register("address", { required: true })}
                                    className="mt-1 w-full h-8 rounded-sm border-2 border-gray-300 bg-white text-sm text-gray-700 shadow-sm ps-2"
                                    placeholder="Type Your Restaurant Address..."
                                />
                                {errors.address && <span className="text-red-600 mt-2">** Address is required</span>}
                            </div>

                            <div className="col-span-12 lg:col-span-6">
                                <label htmlFor="city" className="block text-base font-medium text-gray-700">
                                    City:
                                </label>

                                <select
                                    defaultValue="Dhaka"
                                    id="city"
                                    {...register("city", { required: true })}
                                    className="mt-1 w-full h-8 rounded-sm border-2 border-gray-300 bg-white text-sm text-gray-700 shadow-sm"
                                >
                                    <option value="Sylhet">Sylhet</option>
                                    <option value="Dhaka">Dhaka</option>
                                    <option value="Khulna">Khulna</option>
                                </select>
                            </div>

                            <div className="col-span-12">
                                <label htmlFor="restaurantphone" className="block text-base font-medium text-gray-700">
                                    Restaurant Phone Number
                                </label>

                                <input
                                    type="tel"
                                    id="restaurantphone"
                                    {...register("restaurantphone", { required: true, maxLength: 11, pattern: /^01[3-9]\d{8}$/ })}
                                    className="mt-1 w-full h-8 rounded-sm border-2 border-gray-300 bg-white text-sm text-gray-700 shadow-sm ps-2"
                                    placeholder="A Valid Bangladesh mobile number starting with 01 (11 digits)..."
                                />
                                {errors.restaurantphone?.type === 'required' && <span className="text-red-600 mt-2">** Restaurant Phone Number is required</span>}
                                {errors.restaurantphone?.type === 'maxLength' && <span className="text-red-600 mt-2">** Phone Number is greater than 11 digits</span>}
                                {errors.restaurantphone?.type === 'pattern' && <span className="text-red-600 mt-2">** Phone Number is not valid</span>}
                            </div>

                            <div className="col-span-12 lg:col-span-6">
                                <label htmlFor="openingtime" className="block text-base font-medium text-gray-700">
                                    Opening Time:
                                </label>

                                <input
                                    type="time"
                                    id="openingtime"
                                    {...register("openingtime", { required: true })}
                                    className="mt-1 w-full h-8 rounded-sm border-2 border-gray-300 bg-white text-sm text-gray-700 shadow-sm ps-2"
                                    defaultValue="12:00"
                                />
                                {errors.openingtime && <span className="text-red-600 mt-2">** Opening Time is required</span>}
                            </div>

                            <div className="col-span-12 lg:col-span-6">
                                <label htmlFor="closingtime" className="block text-base font-medium text-gray-700">
                                    Closing Time:
                                </label>

                                <input
                                    type="time"
                                    id="closingtime"
                                    {...register("closingtime", { required: true })}
                                    className="mt-1 w-full h-8 rounded-sm border-2 border-gray-300 bg-white text-sm text-gray-700 shadow-sm ps-2"
                                    defaultValue="22:00"
                                />
                                {errors.closingtime && <span className="text-red-600 mt-2">** Opening Time is required</span>}
                            </div>

                            <div className="col-span-12 lg:col-span-6">
                                <label htmlFor="password" className="block text-base font-medium text-gray-700">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    id="password"
                                    {...register("password", { required: true })}
                                    className="mt-1 w-full h-8 rounded-sm border-2 border-gray-300 bg-white text-sm text-gray-700 shadow-sm ps-2"
                                    placeholder="Type Password..."
                                />
                                {errors.password && <span className="text-red-600 mt-2">** Password is required</span>}
                            </div>

                            <div className="col-span-12 lg:col-span-6">
                                <label
                                    htmlFor="passwordconfirm"
                                    className="block text-base font-medium text-gray-700"
                                >
                                    Confirm Password
                                </label>

                                <input
                                    type="password"
                                    id="passwordconfirm"
                                    {...register("passwordconfirm", { required: true })}
                                    className="mt-1 w-full h-8 rounded-sm border-2 border-gray-300 bg-white text-sm text-gray-700 shadow-sm ps-2"
                                    placeholder="Type The Same Password Again..."
                                />
                                {errors.passwordconfirm && <span className="text-red-600 mt-2">** Confirm Password is required</span>}
                            </div>

                            <div className="col-span-12">
                                <p className="text-base text-gray-500">
                                    By creating an account, you agree to our
                                    <Link href="#" className="text-gray-700 underline">
                                        terms and conditions
                                    </Link>
                                    and
                                    <Link href="#" className="text-gray-700 underline">privacy policy</Link>.
                                </p>
                            </div>

                            <div className="col-span-12 justify-center sm:flex sm:items-center sm:gap-4 text-center">
                                <button
                                    className="inline-block shrink-0 rounded-md border border-green-600 bg-green-600 px-20 py-2.5 mt-2 text-base font-medium text-white transition hover:bg-green-700 focus:outline-none focus:ring active:text-green-600"
                                >
                                    Sign Up As A Restaurant
                                </button>
                            </div>
                        </form>
                        <div className="w-full mt-8">
                            <p className="mt-4 text-base text-gray-500 sm:mt-0">
                                Already have an account?
                                <Link href="/business/signin" className="text-green-600 font-medium"> Sign In</Link>.
                            </p>
                        </div>
                    </div>
                </main>
            </section>
        </main>
    )
}

export default SignUp;