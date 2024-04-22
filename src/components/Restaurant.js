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
                const response = await axios.get(`http://localhost:4000/restaurants/${restaurant?.restaurantEmail}`);
                return response.data?.tags.slice(0, 3);
            } catch (error) {
                console.log(error?.message);
            }
        }
    })
    return (
        <Link href={`/restaurants/${restaurant?._id}`}>
            <div className="w-[340px] h-full bg-orange-100 shadow-lg shadow-gray-200">
                <div className="w-full h-[220px] relative">
                    <Image fill={true} src={restaurant?.restaurantThumbnail} alt="Restaurant" className="w-full h-full object-cover rounded-t" />
                </div>
                <div className="pt-4 border-2 border-t-0 border-orange-100 rounded-b">
                    <h4 className="px-5 text-2xl font-medium">{restaurant?.restaurantName}</h4>
                    <div className="px-7 flex justify-start items-center gap-4 mt-4">
                        <GrMapLocation />
                        <h6 className="text-sm">{restaurant?.address}, {restaurant?.city}</h6>
                    </div>
                    <div className="px-7 flex justify-start items-center gap-4 mt-4">
                        <RiTimerLine />
                        <h6 className="text-sm">{restaurant?.openingTime} - {restaurant?.closingTime}</h6>
                    </div>
                    <div className="w-full h-full flex justify-center items-end gap-4 flex-wrap mt-7 pb-7">
                        {
                            tags.map((tag, index) => <div key={index} className="bg-green-600 text-white text-sm font-normal px-4 py-1.5 rounded-sm shadow-sm">
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