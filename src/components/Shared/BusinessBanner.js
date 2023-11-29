"use client"

import useAuth from "@/app/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";


const BusinessBanner = () => {
  const { user, loading } = useAuth();

  const { data: restaurantInfo = {} } = useQuery({
    queryKey: ['restaurantInfo', user?.email],
    queryFn: async () => {
      try {
        const response = await axios.get(`http://localhost:5000/restaurants/${user?.email}`);
        return response.data;
      } catch (error) {
        console.log(error?.message);
      }
    }
  })

  return (
    <section className="w-full h-[600px] relative">
      <Image layout="fill" objectFit="cover" src={restaurantInfo?.restaurantThumbnail} alt="Banner" className="w-full h-full object-cover" />
      <div className="absolute top-0 w-full h-full flex flex-col justify-center items-center">
        <h2 className="bg-green-600 px-10 py-3 text-4xl text-white font-medium rounded-sm">{restaurantInfo?.restaurantName}</h2>
        <h4 className="bg-orange-600 px-10 py-2 text-3xl text-white font-medium rounded-sm">Menu</h4>
      </div>
    </section>
  )
}

export default BusinessBanner