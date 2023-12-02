"use client";

import Image from 'next/image';
import React from 'react';

import restaurantsBannerImg from "@/assets/image/restaurant-banner.jpg";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Restaurant from '@/components/Restaurant';


const Restaurants = () => {
    const { data: restaurants = [] } = useQuery({
        queryKey: ["restaurants"],
        queryFn: async () => {
            const response = await axios.get('http://localhost:5000/restaurants');
            return response.data.filter((restaurant) => restaurant?.tags.length > 0);
        }
    });

    return (
        <main>
            <section>
                <div className="w-full h-[500px] relative">
                    <Image fill={true} src={restaurantsBannerImg} alt="Restaurants Banner" className="w-full h-full object-cover object-top" />
                    <div className="absolute top-0 w-full h-full flex justify-center items-center">
                        <h1 className="bg-green-600 text-white text-4xl tracking-wider font-semibold px-14 py-3.5 rounded shadow-xl">
                            Restaurants
                        </h1>
                    </div>
                </div>
            </section>
            <section className="py-28">
                <div className="flex justify-center items-start gap-14 flex-wrap">
                    {
                        restaurants?.map((restaurant) => <Restaurant key={restaurant?._id} restaurant={restaurant} />)
                    }
                </div>
            </section>
        </main>
    )
}

export default Restaurants