'use client';

import Rating from "react-rating";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Voucher from "./Shared/Voucher";

const RestaurantVouchers = ({ restaurantEmail }) => {

  const { data: vouchers = [] } = useQuery({
    queryKey: ['vouchers'],
    queryFn: async () => {
      try {
        const response = await axios.get(`http://localhost:4000/vouchers/${restaurantEmail}`);

        if (response?.status === 200) {
          return response?.data;
        }
      } catch (error) {
        console.log(error?.message);
      }
    }
  });

  return (
    <section>
      <h2 className="text-xl font-medium">Restaurant Vouchers</h2>
      {
        vouchers?.length === 0 && (
          <h4 className="mt-7 ms-4 text-lg font-medium">
            No vouchers are available for this restaurant...
          </h4>
        )
      }
      <div className="mt-12 flex flex-wrap justify-center items-center gap-12">
        {
          vouchers.map((voucher) => <Voucher voucher={voucher} isRestaurantNameShown={false} isCopyCodeShown={true} key={voucher?._id} />)
        }
      </div>
    </section>
  )
}

export default RestaurantVouchers;