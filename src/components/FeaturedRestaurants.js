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
        const response = await axios.get('http://localhost:4000/restaurants');
        const featured = response.data.slice(0, 3);
        return featured;
      } catch (error) {
        console.log(error?.message);
      }
    }
  });

  return (
    <section className="py-28 px-4">
      <div className="max-w-7xl mx-auto h-[1500px] lg:h-[1000px] xl:h-[550px] overflow-hidden">
        <div className="w-full h-full flex flex-col xl:flex-row justify-between items-start gap-14 xl:gap-0">
          <div
            className="w-full xl:w-[30%] h-full bg-green-600 flex flex-col justify-center items-center gap-16 p-10 rounded-sm"
            data-aos="fade-right"
            data-aos-offset="100"
            data-aos-duration="1000">
            <h4 className="text-center text-4xl text-white font-medium">
              Featured Restaurants
            </h4>
            <Link href="/restaurants" className="text-xl bg-white font-medium px-12 py-3 rounded">{'All Restaurants >>'}</Link>
          </div>
          <div
            className="w-full xl:w-[60%] h-full flex flex-col md:flex-row justify-center items-center gap-5"
            data-aos="fade-left"
            data-aos-offset="100"
            data-aos-duration="1000">
            <div className="md:flex-1 w-full h-full">
              <FeaturedRestaurant restaurant={featuredRestaurants[0]} />
            </div>
            <div className="w-full h-full md:hidden">
              <FeaturedRestaurant restaurant={featuredRestaurants[1]} />
            </div>
            <div className="w-full h-full md:hidden">
              <FeaturedRestaurant restaurant={featuredRestaurants[2]} />
            </div>
            <div className="hidden md:flex flex-col justify-center items-center flex-1 h-full gap-5">
              <FeaturedRestaurant restaurant={featuredRestaurants[1]} />
              <FeaturedRestaurant restaurant={featuredRestaurants[2]} />
            </div>
          </div>
        </div>
      </div>
    </section >
  )
}

export default FeaturedRestaurants