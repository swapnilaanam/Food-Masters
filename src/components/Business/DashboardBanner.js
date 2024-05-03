"use client";

import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAxiosSecureBusiness from "@/hooks/useAxiosSecureBusiness";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FcCandleSticks, FcMoneyTransfer, FcPaid } from "react-icons/fc"
import { IoFastFoodOutline } from "react-icons/io5"

const DashboardBanner = () => {
  const { user } = useAuth();

  const [axiosSecureBusiness] = useAxiosSecureBusiness();

  const { data: totalOrders = 0 } = useQuery({
    queryKey: ["totalOrders", user?.email],
    queryFn: async () => {
      try {
        const response = await axiosSecureBusiness.get(`/orders/restaurant/${user?.email}`);

        if (response.status === 200) {
          return response?.data?.length;
        }
      } catch (error) {
        console.log(error?.message);
      }
    }
  });

  const { data: totalMenu = 0 } = useQuery({
    queryKey: ["totalMenu", user?.email],
    queryFn: async () => {
      try {
        const response = await axiosSecureBusiness.get(`/menus/${user?.email}`);

        if (response.status === 200) {
          return response?.data?.length;
        }
      }
      catch (error) {
        console.log(error.message);
      }
    }
  });

  const { data: totalCategories = 0 } = useQuery({
    queryKey: ["totalCategories", user?.email],
    queryFn: async () => {
      try {
        const response = await axios.get(`http://localhost:4000/restaurants/${user?.email}`);

        if (response.status === 200) {
          return response?.data?.tags?.length;
        }
      }
      catch (error) {
        console.log(error.message);
      }
    }
  });

  const { data: totalIncome = 0 } = useQuery({
    queryKey: ["totalIncome", user?.email],
    queryFn: async () => {
      try {
        if (user?.email) {
          const response = await axiosSecureBusiness.get(`http://localhost:4000/orders/restaurant/${user?.email}`);

          if (response.status === 200) {
            // console.log(response?.data);
            const deliveredOrders = response?.data?.filter((order) => order.deliveryStatus === "Delivered");

            return deliveredOrders.reduce((total, currentOrder) => total + currentOrder.total, 0);
          }
        }
      }
      catch (error) {
        console.log(error.message);
      }
    }
  });

  return (
    <section className="max-w-7xl mx-auto py-14 flex justify-between items-center">
      <div className="bg-orange-200 p-10 w-72 rounded drop-shadow-lg">
        <div className="flex justify-center items-center gap-5">
          <FcPaid className="text-4xl" />
          <h4 className="text-2xl font-medium">Total Orders</h4>
        </div>
        <h6 className="text-3xl font-medium text-center mt-4">{totalOrders}</h6>
      </div>
      <div className="bg-orange-200 p-10 w-72 rounded drop-shadow-lg">
        <div className="flex justify-center items-center gap-5">
          <IoFastFoodOutline className="text-3xl" />
          <h4 className="text-2xl font-medium">Total Menu</h4>
        </div>
        <h6 className="text-3xl font-medium text-center mt-4">{totalMenu}</h6>
      </div>
      <div className="bg-orange-200 p-10 w-72 rounded drop-shadow-lg">
        <div className="flex justify-center items-center gap-5">
          <FcCandleSticks className="text-3xl" />
          <h4 className="text-2xl font-medium">Categories</h4>
        </div>
        <h6 className="text-3xl font-medium text-center mt-4">{totalCategories}</h6>
      </div>
      <div className="bg-orange-200 p-10 w-72 rounded drop-shadow-lg">
        <div className="flex justify-center items-center gap-5">
          <FcMoneyTransfer className="text-3xl" />
          <h4 className="text-2xl font-medium">Total Income</h4>
        </div>
        <h6 className="text-3xl font-medium text-center mt-4">BTD. {totalIncome}</h6>
      </div>
    </section>
  )
}

export default DashboardBanner