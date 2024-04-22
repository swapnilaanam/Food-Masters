"use client";

import useAuth from "@/app/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const AddMenu = ({ refetch }) => {
    const [isAddFoodModalOpen, setIsAddFoodModalOpen] = useState(false);

    const { user } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const { data: categories = [] } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            try {
                const response = await axios.get('http://localhost:4000/categories');
                // console.log(response.data);
                return response.data;
            } catch (error) {
                console.log(error);
            }
        }
    });

    const { data: restaurantInfo = {} } = useQuery({
        queryKey: ['restaurantInfo', user?.email],
        queryFn: async () => {
          try {
            const response = await axios.get(`http://localhost:4000/restaurants/${user?.email}`);
            return response.data;
          } catch (error) {
            console.log(error?.message);
          }
        }
      });

      const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('image', data?.foodimage[0]);

        const img_hosting_url = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_img_hosting_token}`;

        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(async (imgResponse) => {
                if (imgResponse.success) {
                    const imgURL = imgResponse?.data?.display_url;

                    const newFood = {
                        foodName: data?.foodname,
                        foodCategory: data?.foodcategory,
                        foodImage: imgURL,
                        foodPrice: data?.foodprice,
                        foodDesc: data?.fooddesc,
                        restaurantEmail: user?.email,
                        restaurantId: restaurantInfo?._id,
                        restaurantName: restaurantInfo?.restaurantName
                    }

                    try {
                        const response = await axios.post('http://localhost:4000/menus', newFood);

                        if (response.status === 201) {

                            const res = await axios.patch(`http://localhost:4000/restaurants/${user?.email}`, { category: data?.foodcategory });

                            if (res.status === 200) {
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "New Food Added To The Menu!",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                reset();
                                refetch();
                                setIsAddFoodModalOpen(false);
                            }
                        }
                    } catch (error) {
                        console.log(error?.message);
                    }
                }
            })
            .catch(error => {
                console.log(error?.message);
            })
    };

    return (
        <section className="w-full">
            <div className="text-center mt-12">
                <button className="bg-green-500 px-12 py-3 text-xl text-white font-medium rounded" onClick={() => setIsAddFoodModalOpen(true)}>
                    Add Food
                </button>
            </div>
            {isAddFoodModalOpen && (
                <div
                    className="fixed z-10 top-[50%] -translate-y-[50%] left-0 right-0 max-w-4xl mx-auto bg-orange-200 rounded-md p-4 shadow-xl shadow-orange-300">
                    <h2 className="text-center text-2xl font-semibold">Add Food</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-[70%] mx-auto mt-12 space-y-6">
                        <div>
                            <label htmlFor="foodname" className="block text-base font-medium text-gray-700">
                                Food Name:
                            </label>

                            <input
                                type="text"
                                id="foodname"
                                {...register("foodname", { required: true })}
                                className="mt-2 w-full h-10 rounded-sm border-2 border-gray-300 bg-white text-sm text-gray-700 shadow-sm ps-2"
                                placeholder="Food Name..."
                            />
                            {errors.foodname && <span className="text-red-600 mt-2">** Food Name is required</span>}
                        </div>
                        <div>
                            <label htmlFor="foodcategory" className="block text-base font-medium text-gray-700">
                                Food Category:
                            </label>

                            <select
                                id="foodname"
                                {...register("foodcategory", { required: true })}
                                defaultValue={"Curry"}
                                className="mt-2 w-full h-10 rounded-sm border-2 border-gray-300 bg-white text-sm text-gray-700 shadow-sm ps-2"
                            >
                                {
                                    categories.map(category => <option key={category?._id}>
                                        {category?.name}
                                    </option>)
                                }
                            </select>
                        </div>
                        <div>
                            <label htmlFor="foodimage" className="block text-base font-medium text-gray-700">
                                Food Price:
                            </label>

                            <input
                                type="file"
                                id="foodimage"
                                {...register("foodimage", { required: true })}
                                className="mt-2 w-full py-1.5 rounded-sm border-2 border-gray-300 bg-white text-sm text-gray-700 shadow-sm"
                            />
                            {errors.foodimage && <span className="text-red-600 mt-2">** Food Image Is Required.</span>}
                        </div>
                        <div>
                            <label htmlFor="foodprice" className="block text-base font-medium text-gray-700">
                                Food Price:
                            </label>

                            <input
                                type="number"
                                id="foodprice"
                                {...register("foodprice", { required: true })}
                                className="mt-2 w-full h-10 rounded-sm border-2 border-gray-300 bg-white text-sm text-gray-700 shadow-sm ps-2"
                                placeholder="Food Price..."
                            />
                            {errors.foodprice && <span className="text-red-600 mt-2">** Food Price is required</span>}
                        </div>
                        <div>
                            <label htmlFor="fooddesc" className="block text-base font-medium text-gray-700">
                                Food Description:
                            </label>

                            <textarea
                                id="fooddesc"
                                {...register("fooddesc")}
                                className="mt-2 w-full h-20 rounded-sm border-2 border-gray-300 bg-white text-sm text-gray-700 shadow-sm ps-2 pt-2"
                                placeholder="Tell About Your Food..."
                            />
                        </div>
                        <div className="text-center mt-2 pb-4">
                            <input type="submit" value="Add Food" className="bg-green-500 text-white px-14 py-2 text-lg font-medium rounded cursor-pointer" />
                        </div>
                    </form>
                    <button onClick={() => setIsAddFoodModalOpen(false)} className="absolute top-0 right-0 bg-red-600 text-white px-4 py-1 rounded">
                        Close X
                    </button>
                </div>
            )}
        </section>
    )
}

export default AddMenu