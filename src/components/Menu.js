"use client";

import useAuth from "@/app/hooks/useAuth";
import { CartContext } from "@/providers/CartProvider";
import axios from "axios";
import Image from "next/image";
import { useContext } from "react";
import { toast } from "react-toastify";

const Menu = ({ menu }) => {
    const { refetch } = useContext(CartContext);
    const { user } = useAuth();

    const handleAddToCart = async (menu) => {
        const cartInfo = {
            foodId: menu._id,
            foodName: menu.foodName,
            foodCategory: menu.foodCategory,
            foodImage: menu.foodImage,
            foodPrice: menu.foodPrice,
            foodDesc: menu.foodDesc,
            restaurantEmail: menu.restaurantEmail,
            restaurantId: menu.restaurantId,
            restaurantName: menu.restaurantName
        }
        try {
            const response = await axios.post(`http://localhost:5000/carts/${user?.email}`, cartInfo);

            if (response.status === 200) {
                refetch();
                toast.success('Added To The Cart', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch (error) {
            console.log(error?.message);
        }
    };

    return (
        <div className="w-[400px] flex justify-start items-start bg-orange-200 rounded relative shadow">
            <div className="w-[40%] h-[220px] relative">
                <Image fill={true} src={menu?.foodImage} className="w-full h-full object-cover rounded-tl rounded-bl" />
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
                            handleAddToCart(menu);
                        }}
                        className="px-6 py-1.5 bg-green-600 text-white font-medium rounded-tl-sm">
                        Add To Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Menu;