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
        const response = await axios.get('http://localhost:5000/categories');
        // console.log()
        const categories = response.data.slice(0, 5);
        return categories;
      } catch (error) {
        console.log(error);
      }
    }
  });

  return (
    <section className="py-28">
      <div className="max-w-7xl 2xl:max-w-[1320px] mx-auto">
        <div className="flex justify-between items-start">
          <h4 className="text-3xl font-medium">Food Categories</h4>
          <Link href="/allcategories" className="text-xl text-green-700 font-medium">{'All Categories >>'}</Link>
        </div>
        <div className="mt-20 flex justify-center items-center gap-16">
          {
            categories.map(category => {
              return (
                <Link href={`/categories/${category?.name}`} key={category?._id} className="w-[200px] h-[200px] relative border-orange-300 border-4 rounded-full">
                  <Image src={category?.img} alt={category?.name} width={200} height={200} className="w-full h-full object-cover rounded-full" />
                  <div className="absolute top-0 flex justify-center items-center w-full h-full z-10 bg-black bg-opacity-50 text-white font-medium text-2xl rounded-full">
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