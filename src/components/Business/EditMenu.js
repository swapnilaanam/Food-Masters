"use client";

import useAxiosSecureBusiness from "@/hooks/useAxiosSecureBusiness";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const EditMenu = ({ setIsEditFoodModalOpen, menu, setCurrentMenu, refetch }) => {
    const [axiosSecureBusiness] = useAxiosSecureBusiness();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = async (data) => {
        const editedFood = {
            foodName: data?.foodname,
            foodPrice: data?.foodprice,
            foodDesc: data?.fooddesc,
        }

        try {
            const response = await axiosSecureBusiness.patch(`/menus/${menu?._id}`, editedFood);
            if(response.status === 200) {
                reset();
                refetch();
                setIsEditFoodModalOpen(false);
                setCurrentMenu(null);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Menu Updated!",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        } catch (error) {
            console.log(error?.message);
        }
    };

    return (
        <div>
            <div className="fixed z-20 top-[50%] -translate-y-[50%] left-0 right-0 max-w-4xl mx-auto bg-orange-200 rounded-md p-10 shadow-xl shadow-orange-300">
                <h2 className="text-center text-2xl font-semibold">Edit Food</h2>
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
                            defaultValue={menu?.foodName}
                        />
                        {errors.foodname && <span className="text-red-600 mt-2">** Food Name is required</span>}
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
                            defaultValue={menu?.foodPrice}
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
                            className="mt-2 w-full h-24 rounded-sm border-2 border-gray-300 bg-white text-sm text-gray-700 shadow-sm ps-2 pt-2"
                            placeholder="Tell About Your Food..."
                            defaultValue={menu?.foodDesc}
                        />
                    </div>
                    <div className="text-center mt-3 pb-4">
                        <input type="submit" value="Edit Food" className="bg-yellow-400 px-14 py-2 text-lg font-medium rounded-sm cursor-pointer border border-yellow-300" />
                    </div>
                </form>
                <button
                    onClick={
                        () => {
                            setIsEditFoodModalOpen(false); 
                            setCurrentMenu(null);
                        }
                    }
                    className="absolute top-0 right-0 bg-red-600 text-white px-4 py-1 rounded-tr">
                    Close X
                </button>
            </div>
        </div>
    )
}

export default EditMenu;