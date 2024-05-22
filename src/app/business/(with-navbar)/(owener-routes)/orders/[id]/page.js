"use client";

import DeliveryTimeline from "@/components/Shared/DeliveryTimeline";
import OrderedItem from "@/components/Shared/OrderedItem";
import useAxiosSecureBusiness from "@/hooks/useAxiosSecureBusiness";
import useBusinessMenu from "@/hooks/useBusinessMenu";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

const SingleOrder = () => {
  const { id } = useParams();
  
  const [axiosSecureBusiness] = useAxiosSecureBusiness();
  const {setIsBusinessMenuOpen} = useBusinessMenu();

  const { data: orderInfo = {}, refetch: orderInfoRefetch } = useQuery({
    queryKey: ["orderInfo", id],
    queryFn: async () => {
      try {
        const response = await axiosSecureBusiness.get(`/orders/order/${id}`);
        return response?.data;
      } catch (error) {
        console.log(error?.message);
      }
    }
  });

  useEffect(() => {
    setIsBusinessMenuOpen(false);
  }, [setIsBusinessMenuOpen]);

  const handleUpdateDeliveryStatus = async (status) => {
    try {
      const response = await axiosSecureBusiness.patch(`/orders/${orderInfo?._id}`, {
        deliveryStatus: status
      });

      if (response.status === 200) {
        toast.success(`Order is now, ${status}`);
        orderInfoRefetch();
      }
    } catch (error) {
      console.log(error?.message)
    }
  }

  return (
    <main>
      <section className="py-20 px-4 2xl:px-0">
        <div className="mx-auto max-w-7xl bg-orange-100 px-4 py-10 sm:px-6 sm:py-10 lg:px-7 rounded-sm shadow-lg">
          <div className="xl:px-24">
            <header className="text-center">
              <h1 className="text-xl font-bold text-gray-900 sm:text-3xl mb-10">Order Info</h1>
            </header>
            <section className="flex flex-col xl:flex-row justify-center items-center xl:items-stretch">
              <div className="space-y-5 flex-1 xl:pr-10 pt-2 pb-12 xl:pb-0">
                <div className="flex flex-col xl:flex-row justify-between items-center">
                  <h2 className="text-xl font-medium">Order Number:</h2>
                  <h4 className="text-lg">{orderInfo?._id}</h4>
                </div>
                <div className="flex flex-col xl:flex-row justify-between items-center">
                  <h2 className="text-xl font-medium">Customer Name:</h2>
                  <h4 className="text-lg text-center lg:text-left">{orderInfo?.customerName}</h4>
                </div>
                <div className="flex flex-col xl:flex-row justify-between items-center">
                  <h2 className="text-xl font-medium">Customer Email: </h2>
                  <h4 className="text-lg">{orderInfo?.customerEmail}</h4>
                </div>
                <div className="flex flex-col xl:flex-row justify-between items-center">
                  <h2 className="text-xl font-medium">Customer Phone:</h2>
                  <h4 className="text-lg">{orderInfo?.customerPhoneNumber}</h4>
                </div>
                <div className="flex flex-col xl:flex-row justify-between items-center">
                  <h2 className="text-xl font-medium">Delivery Address:</h2>
                  <h4 className="text-lg">{orderInfo?.customerAddress}, {orderInfo?.customerCity}</h4>
                </div>
                <div className="flex flex-col xl:flex-row justify-between items-center">
                  <h2 className="text-xl font-medium">Total Paid Amount:</h2>
                  <h4 className="text-lg">BDT. {orderInfo?.total}</h4>
                </div>
              </div>
              <div className="flex-1 xl:pl-10 pt-12 xl:pt-2 border-t-2 xl:border-t-0 border-l-0 xl:border-l-2 border-orange-400">
                <ul className="space-y-5">
                  {orderInfo?.orderedItems?.map((orderedItem) => <OrderedItem key={orderedItem?.foodId} orderedItemInfo={orderedItem} />)}
                </ul>
              </div>
            </section>
            <DeliveryTimeline orderInfo={orderInfo} />
            <div className="w-full">
              <h4 className="w-full text-center text-xl font-semibold my-10">Update Delivery Status</h4>
              <div className="w-full">
                {
                  orderInfo?.deliveryStatus === "Pending" && (
                    <div className="flex justify-center items-center gap-10">
                      <button onClick={() => handleUpdateDeliveryStatus("In Kitchen")} className="bg-green-600 text-white px-5 py-2 rounded cursor-pointer text-sm font-medium">
                        Mark As In Kitchen
                      </button>
                      <button onClick={() => handleUpdateDeliveryStatus("Cancelled")} className="bg-green-600 text-white px-5 py-2 rounded cursor-pointer text-sm font-medium">
                        Mark As Cancelled
                      </button>
                    </div>
                  )
                }
                {
                  orderInfo?.deliveryStatus === "In Kitchen" && (
                    <div className="flex justify-center items-center gap-10">
                      <button onClick={() => handleUpdateDeliveryStatus("In Delivery")} className="bg-green-600 text-white px-5 py-2 rounded cursor-pointer text-sm font-medium">Mark As In Delivery</button>
                    </div>
                  )
                }
                {
                  orderInfo?.deliveryStatus === "In Delivery" && (
                    <h4 className="w-[50%] mx-auto text-xl font-semibold text-green-600 text-center">Order Is Out For Delivery. Customer Will Mark The Order As Delivered Upon Receiving It From The Rider.</h4>
                  )
                }
                {
                  orderInfo?.deliveryStatus === "Delivered" && (
                    <h4 className="text-2xl font-semibold text-green-600 text-center">Order Delivered.</h4>
                  )
                }
                {
                  orderInfo?.deliveryStatus === "Cancelled" && (
                    <h4 className="text-2xl font-semibold text-red-600 text-center">Order Cancelled, No Action Available.</h4>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </section >
    </main >
  )
}

export default SingleOrder;