"use client";

import React, { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Restaurant from '@/components/Restaurant';
import TopBanner from '@/components/Shared/TopBanner';


const Restaurants = () => {
    const [currentCategory, setCurrentCategory] = useState("All");

    const { data: categories = [] } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            try {
                const response = await axios.get('http://localhost:5000/categories');
                return response.data;
            } catch (error) {
                console.log(error?.message);
            }
        }
    })

    const { data: restaurants = [], refetch } = useQuery({
        queryKey: ["restaurants"],
        queryFn: async () => {
            try {
                const response = await axios.get('http://localhost:5000/restaurants');
                if (currentCategory === 'All') {
                    return response.data.filter((restaurant) => restaurant?.tags.length > 0);
                }
                else {
                    const filteredRestaurants = response.data.filter((restaurant) => restaurant?.tags.includes(currentCategory));
                    return filteredRestaurants.filter((restaurant) => restaurant?.tags.length > 0);
                }
            } catch (error) {
                console.log(error?.message);
            }
        }
    });

    useEffect(() => {
        refetch();
    }, [currentCategory]);

    return (
        <main>
            <TopBanner title="Restaurants" />
            <section className="pt-14 pb-28">
                <div className="max-w-7xl 2xl:max-w-[1320px] mx-auto px-4 xl:px-0">
                    <h4 className="text-2xl font-medium mb-4">Filters: </h4>
                    <div onClick={(e) => setCurrentCategory(e.target.innerText)} className="ps-4 w-full flex justify-start items-center gap-3 flex-wrap mb-16">
                        <button className="bg-orange-200 hover:bg-green-600 hover:text-white px-5 py-1 rounded-sm">
                            All
                        </button>
                        {
                            categories.map((category) => <button key={category?._id} className="bg-orange-200 hover:bg-green-600 hover:text-white px-5 py-1 rounded-sm">
                                {category?.name}
                            </button>)
                        }
                    </div>
                    <div className="flex justify-center items-start gap-14 2xl:gap-20 flex-wrap">
                        {
                            restaurants.length === 0 ? <h4 className="mt-7 text-xl font-medium">No Restaurants Available...</h4> : 
                            restaurants?.map((restaurant) => <Restaurant key={restaurant?._id} restaurant={restaurant} />)
                        }
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Restaurants;