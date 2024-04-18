"use client";

import Menus from "@/components/Menus";
import RestaurantInfo from "@/components/RestaurantInfo";
import TopBanner from "@/components/Shared/TopBanner";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { GrMapLocation } from "react-icons/gr";
import { IoIosStar, IoMdStar } from "react-icons/io";
import Rating from "react-rating";

import './page.css';
import RestaurantRatings from "@/components/RestaurantRatings";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaRegStar, FaStar } from "react-icons/fa";

const Restaurant = () => {
  const [currentRestaurantPageView, setCurrentRestaurantPageView] = useState("Menu");

  const { id } = useParams();

  const { data: restaurant = {} } = useQuery({
    queryKey: ["restaurant", id],
    queryFn: async () => {
      try {
        const response = await axios.get(`http://localhost:5000/restaurants/restaurant/${id}`);
        return response.data;
      } catch (error) {
        console.log(error?.message);
      }
    }
  });

  const { data: ratingsCount = 0 } = useQuery({
    queryKey: ["ratingsCount", id],
    queryFn: async () => {
      try {
        const response = await axios.get(`http://localhost:5000/ratings/${id}`);

        if (response.status === 200) {
          console.log(response?.data);
          console.log(Number(response?.data?.reduce((total, current) => total + current.rating, 0) / response?.data.length));
          return (response?.data?.reduce((total, current) => total + current.rating, 0) / response?.data.length);
        }
      } catch (error) {
        toast.error(error?.message);
      }
    }
  });


  return (
    <main>
      <TopBanner title="Restaurant" />

      <section className="w-full h-[170px] bg-orange-200 drop-shadow-md">
        <div className="max-w-7xl 2xl:max-w-[1320px] mx-auto h-full flex justify-start items-start gap-5">
          <div className="w-[200px] h-[200px] relative bg-orange-200 -top-16 rounded-full">
            <Image fill={true} src={restaurant?.restaurantThumbnail} alt="Restaurant" className="w-full h-full p-4 object-cover rounded-full" />
          </div>
          <div>
            <h2 className="text-4xl font-medium mt-4">{restaurant?.restaurantName}</h2>
            <div className="flex justify-start items-center gap-4 mt-4">
              <GrMapLocation />
              <h4>{restaurant?.address}, {restaurant?.city}</h4>
            </div>
            <div className="mt-4">
              <Rating
                initialRating={ratingsCount}
                emptySymbol={<FaRegStar className="text-green-600 text-3xl" />}
                fullSymbol={<FaStar className="text-green-600 text-3xl" />}
                readonly
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-28">
        <div className="max-w-7xl 2xl:max-w-[1320px] mx-auto flex justify-between items-start gap-16">
          <aside className="w-[25%] bg-orange-100 border border-orange-200 drop-shadow-md py-10 px-5">
            <h3 className="text-xl font-medium mb-7">Restaurant Navigator</h3>
            <div className="flex flex-col items-stretch justify-center gap-5">
              <button
                className="bg-green-600 text-white font-medium px-4 py-2"
                onClick={() => setCurrentRestaurantPageView("Menu")}
              >
                Menu
              </button>
              <button
                className="bg-green-600 text-white font-medium px-7 py-2"
                onClick={() => setCurrentRestaurantPageView("Restaurant Ratings")}
              >
                Ratings
              </button>
              <button
                className="bg-green-600 text-white font-medium px-7 py-2"
                onClick={() => setCurrentRestaurantPageView("Restaurant Info")}
              >
                Restaurant Info
              </button>
            </div>
          </aside>
          <div className="w-[75%] bg-orange-50 border border-orange-200 p-5 pb-14 shadow-lg shadow-orange-100">
            {
              currentRestaurantPageView === "Menu" && <Menus restaurantId={id} restaurant={restaurant} />
            }
            {
              currentRestaurantPageView === "Restaurant Ratings" && <RestaurantRatings restaurantId={id} />
            }
            {
              currentRestaurantPageView === "Restaurant Info" && <RestaurantInfo restaurant={restaurant} />
            }


          </div>
        </div>
      </section>
    </main>
  )
}

export default Restaurant;