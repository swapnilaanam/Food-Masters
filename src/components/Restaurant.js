"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { GrMapLocation } from "react-icons/gr";
import { RiTimerLine } from "react-icons/ri";

const Restaurant = ({ restaurant }) => {
    const { data: tags = [] } = useQuery({
        queryKey: ["restaurant", restaurant?.restaurantEmail],
        queryFn: async () => {
            try {
                const response = await axios.get(`http://localhost:5000/restaurants/${restaurant?.restaurantEmail}`);
                return response.data?.tags.slice(0, 3);
            } catch (error) {
                console.log(error?.message);
            }
        }
    })
    return (
        <Link href={`/restaurants/${restaurant?._id}`}>
            <div className="w-96 bg-orange-200 shadow-xl shadow-orange-50">
                <div className="w-full h-[250px] relative">
                    <Image fill={true} src={restaurant?.restaurantThumbnail} alt="Restaurant" className="w-full h-full object-cover rounded-t" />
                </div>
                <div className="pt-4 border-2 border-t-0 border-orange-200 rounded-b">
                    <h4 className="px-5 text-2xl font-medium">{restaurant?.restaurantName}</h4>
                    <div className="px-5 flex justify-start items-center gap-4 mt-4">
                        <GrMapLocation />
                        <h6 className="text-sm">{restaurant?.address}, {restaurant?.city}</h6>
                    </div>
                    <div className="px-5 flex justify-start items-center gap-4 mt-4">
                        <RiTimerLine />
                        <h6 className="text-sm">{restaurant?.openingTime} - {restaurant?.closingTime}</h6>
                    </div>
                    <div className="ps-5 flex justify-start items-center gap-4 flex-wrap mt-6 border-t-2 border-gray-600 py-5">
                        {
                            tags.map((tag, index) => <div key={index} className="bg-green-600 text-white px-4 py-2 rounded-sm shadow-sm">
                                {tag}
                            </div>)
                        }
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Restaurant