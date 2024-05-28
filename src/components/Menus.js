"use client";

import { useQuery } from "@tanstack/react-query";
import Menu from "./Menu";
import axios from "axios";
import { useEffect, useState } from "react";

const Menus = ({ restaurantId, restaurant }) => {
    const [currentCategory, setCurrentCategory] = useState('All');

    const { data: menus = [], refetch } = useQuery({
        queryKey: ["menus", restaurantId],
        queryFn: async () => {
            try {
                const response = await axios.get(`https://food-masters-server-production.up.railway.app/menus`);
                const filteredMenus = response.data.filter((menu) => menu?.restaurantId === restaurantId);
                if (currentCategory === 'All') {
                    return filteredMenus;
                }
                else {
                    return filteredMenus?.filter((menu) => menu?.foodCategory === currentCategory);
                }
            } catch (error) {
                console.log(error?.message);
            }
        }
    });

    useEffect(() => {
        refetch();
    })

    return (
        <div>
            <h4 className="text-2xl mb-4">Filters</h4>
            <ul className="mb-10 ps-2 flex flex-wrap justify-start items-center gap-5">
                <li
                    onClick={(e) => setCurrentCategory(e.target.innerText)}
                    className={`${currentCategory === 'All' ? 'bg-green-600 text-white' : 'bg-orange-200 text-black'} px-5 py-2 text-sm rounded-sm cursor-pointer hover:bg-green-500 hover:text-white`}
                >
                    All
                </li>
                {restaurant?.tags?.map((tag, index) => <li
                    key={index}
                    onClick={(e) => setCurrentCategory(e.target.innerText)}
                    className={`${currentCategory === tag ? 'bg-green-600 text-white' : 'bg-orange-200 text-black'} px-5 py-2 text-sm rounded-sm cursor-pointer hover:bg-green-500 hover:text-white`}
                >
                    {tag}
                </li>)}
            </ul>
            <div className="flex justify-center items-center flex-wrap gap-14">
                {
                    menus.map((menu) => <Menu key={menu?._id} menu={menu} />)
                }
            </div>
        </div>
    )
}

export default Menus