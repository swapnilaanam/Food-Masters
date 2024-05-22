"use client"

import axios from "axios"
import Link from "next/link"

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const FoodCategories = () => {
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const response = await axios.get('http://localhost:4000/categories');
        const categories = response.data.slice(0, 5);
        return categories;
      } catch (error) {
        console.log(error);
      }
    }
  });

  return (
    <section className="pt-28 pb-16 xl:py-28 px-4 md:px-7">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-5 md:gap-0">
          <h4 className="text-3xl font-medium">Food Categories</h4>
          <Link href="/allcategories" className="text-xl text-green-600 font-medium">{'All Categories >>'}</Link>
        </div>
        <div className="mt-20 flex flex-col md:flex-row md:flex-wrap justify-center lg:justify-around items-center gap-16">
          {
            categories.map(category => {
              return (
                <Link href={`/categories/${category?.name}`} key={category?._id} className="w-[180px] h-[180px] relative border-orange-300 border-4 rounded-full">
                  <Image src={category?.img} alt={category?.name} width={200} height={200} className="w-full h-full object-cover rounded-full" />
                  <div className="absolute top-0 flex justify-center items-center w-full h-full z-10 bg-black bg-opacity-60 text-white font-semibold text-xl rounded-full">
                    {category?.name}
                  </div>
                </Link>
              )
            })
          }
        </div>
      </div>
    </section>
  )
}

export default FoodCategories;