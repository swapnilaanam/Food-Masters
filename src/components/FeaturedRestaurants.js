"use client"

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import FeaturedRestaurant from "./FeaturedRestaurant";

const FeaturedRestaurants = () => {
  const { data: featuredRestaurants = [] } = useQuery({
    queryKey: ["featuredRestaurants"],
    queryFn: async () => {
      try {
        const response = await axios.get('http://localhost:5000/restaurants');
        const featured = response.data.slice(0, 3);
        return featured;
      } catch (error) {
        console.log(error?.message);
      }
    }
  });

  return (
    <section className="py-28">
      <div className="max-w-7xl 2xl:max-w-[1320px] mx-auto h-[550px]">
        <div className="w-full h-full flex justify-between items-start">
          <div className="w-[30%] h-full bg-green-200 flex flex-col justify-center items-center gap-24 p-10">
            <h4 className="text-3xl font-medium">Featured Restaurants</h4>
            <Link href="/restaurants" className="text-xl bg-white font-medium px-10 py-2 rounded">{'All Restaurants >>'}</Link>
          </div>
          <div className="w-[60%] h-full flex justify-center items-center gap-5">
            <FeaturedRestaurant restaurant={featuredRestaurants[0]} picHeight={100} />
            <div className="flex flex-col justify-center items-center flex-1 h-full gap-5">
              <FeaturedRestaurant restaurant={featuredRestaurants[1]} picHeight={50} />
              <FeaturedRestaurant restaurant={featuredRestaurants[2]} picHeight={50} />
            </div>
          </div>
        </div>
      </div>
    </section >
  )
}

export default FeaturedRestaurants