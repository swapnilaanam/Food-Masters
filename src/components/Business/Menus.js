"use client"

import { useQuery } from "@tanstack/react-query";
import AddMenu from "./AddMenu";
import useAuth from "@/app/hooks/useAuth";
import axios from "axios";
import { useEffect, useState } from "react";
import EditMenu from "./EditMenu";
import Swal from "sweetalert2";

const Menus = () => {
    const [availableCategory, setAvailableCategory] = useState([]);
    const [currentCategory, setCurrentCategory] = useState("All Food");
    const [isEditFoodModalOpen, setIsEditFoodModalOpen] = useState(false);
    const [currentMenu, setCurrentMenu] = useState(null);

    const { user } = useAuth();

    const { data: menus = [], refetch } = useQuery({
        queryKey: ["menus", user?.email],
        queryFn: async (req, res) => {
            try {
                const response = await axios.get(`http://localhost:5000/menus/${user?.email}`);

                const categorySet = new Set();
                response.data?.filter(menu => categorySet.add(menu?.foodCategory));

                setAvailableCategory(Array.from(categorySet));

                // console.log(currentCategory);

                if (currentCategory === 'All Food') {
                    return response.data;
                }
                else {
                    return response.data.filter((menu) => menu.foodCategory === currentCategory);
                }
            } catch (error) {
                console.log(error?.message);
            }
        }
    });

    useEffect(() => {
        refetch();
    }, [currentCategory]);

    const handleDeleteMenu = async (id) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const response = await axios.delete(`http://localhost:5000/menus/${id}`);
                    if (response.status === 200) {
                        refetch();
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Food Item Removed!",
                            showConfirmButton: false,
                            timer: 1500
                          });
                    }
                }
            });
        } catch (error) {
            console.log(error?.message);
        }
    }

    return (
        <section>
            <div className="max-w-7xl 2xl:max-w-[1320px] mx-auto">
                <AddMenu refetch={refetch} />
                <div className="flex justify-end mt-12">
                    <div className="w-[20%] flex justify-center items-center gap-5">
                        <label htmlFor="foodcategory" className="block text-lg font-medium text-gray-900">
                            Category:
                        </label>

                        <select
                            name="foodcategory"
                            defaultValue="All Food"
                            id="foodcategory"
                            className="h-8 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm ps-2"
                            onChange={(e) => setCurrentCategory(e.target.value)}
                        >
                            <option>All Food</option>
                            {
                                availableCategory.map((category, index) => <option key={index}>
                                    {category}
                                </option>)
                            }
                        </select>
                    </div>
                </div>
                <div className="flex justify-center items-center flex-wrap gap-12 py-20">
                    {
                        menus.map(menu => {
                            return (
                                <div key={menu?._id} className="w-[400px] flex justify-start items-start bg-orange-200 rounded relative shadow">
                                    <div className="w-[40%] h-[220px]">
                                        <img src={menu?.foodImage} className="w-full h-full object-cover rounded-tl rounded-bl" />
                                    </div>
                                    <div className="w-[60%] ps-7 py-2 pr-1">
                                        <h4 className="text-lg font-medium">{menu?.foodName}</h4>
                                        <div className="bg-green-600 text-white font-medium w-fit px-4 py-1 absolute top-0 left-0 rounded-tl">
                                            {menu?.foodCategory}
                                        </div>
                                        <p title={menu?.foodDesc} className="mt-2 text-sm cursor-pointer">{menu?.foodDesc.slice(0, 40)} ...</p>
                                        <div className="bg-white w-fit px-4 py-1.5 mt-4 rounded">
                                            BDT. <span className="font-medium ms-2">{menu?.foodPrice}</span>
                                        </div>
                                        <div className="absolute bottom-0 right-0 shadow">
                                            <button
                                                onClick={() => {
                                                    setIsEditFoodModalOpen(true);
                                                    setCurrentMenu(menu);
                                                }}
                                                className="px-6 py-1.5 bg-yellow-400">
                                                Edit
                                            </button>
                                            <button onClick={() => handleDeleteMenu(menu?._id)} className="px-4 py-1.5 bg-red-600 text-white rounded-br">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                {
                    isEditFoodModalOpen && (
                        <EditMenu setIsEditFoodModalOpen={setIsEditFoodModalOpen} menu={currentMenu} setCurrentMenu={setCurrentMenu} refetch={refetch} />
                    )
                }
            </div>
        </section>
    )
}

export default Menus;