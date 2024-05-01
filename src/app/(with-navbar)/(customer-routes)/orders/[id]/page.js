"use client";

import DeliveryTimeline from "@/components/Shared/DeliveryTimeline";
import OrderedItem from "@/components/Shared/OrderedItem";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SingleOrder = () => {
    const [totalOrderNumber, setTotalOrderNumber] = useState(0);

    const { id } = useParams();

    const { data: orderInfo = {}, refetch: orderInfoRefetch } = useQuery({
        queryKey: ["orderInfo", id],
        queryFn: async () => {
            try {
                const response = await axios.get(`http://localhost:4000/orders/order/${id}`);
                return response?.data;
            } catch (error) {
                console.log(error?.message);
            }
        }
    });

    useEffect(() => {
        setTotalOrderNumber(orderInfo?.orderedItems?.reduce((total, prev) => total + prev.quantity, 0));
    }, [orderInfo]);

    const handleUpdateDeliveryStatus = async (status) => {
        try {
            const response = await axios.patch(`http://localhost:4000/orders/${orderInfo?._id}`, {
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
            <section className="py-20">
                <div className="mx-auto max-w-7xl 2xl:max-w-[1320px] bg-orange-100 px-4 py-10 sm:px-6 sm:py-10 lg:px-7 rounded-sm shadow-lg">
                    <div className="px-24">
                        <header className="text-center">
                            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl mb-10">Order Info</h1>
                        </header>
                        <section className="flex justify-center">
                            <div className='w-1/2 space-y-1'>
                                <div className="flex justify-center items-center gap-2 w-[460px]">
                                    <h4 className="text-lg font-medium leading-8 w-[40%] text-right">
                                        Order Number:
                                    </h4>
                                    <h4 className="ms-2 text-base font-normal leading-8 w-1/2 mt-[1px]">{orderInfo?._id}</h4>
                                </div>
                                <div className="flex justify-center items-center gap-2 w-[460px]">
                                    <h4 className="text-lg font-medium leading-8 w-[40%] text-right">
                                        Customer Name:
                                    </h4>
                                    <h4 className="ms-2 text-base font-normal leading-8 w-1/2 mt-[1px]">{orderInfo?.customerName}</h4>
                                </div>
                                <div className="flex justify-center items-center gap-2 w-[460px]">
                                    <h4 className="text-lg font-medium leading-8 w-[40%] text-right">
                                        Restaurant Name:
                                    </h4>
                                    <h4 className="ms-2 text-base font-normal leading-8 w-1/2 mt-[1px]">{orderInfo?.restaurantName}</h4>
                                </div>
                                <div className="flex justify-center items-center gap-2 w-[460px]">
                                    <h4 className="text-lg font-medium leading-8 w-[40%] text-right">
                                        Order Quantity:
                                    </h4>
                                    <h4 className="ms-2 text-base font-normal leading-8 rounded-sm w-1/2 mt-[1px]">
                                        <span className="bg-slate-800 text-white px-4 py-0.5 rounded-sm">{totalOrderNumber}</span>
                                    </h4>
                                </div>
                                <div className="flex justify-center items-center gap-2 w-[460px]">
                                    <h4 className="text-lg font-medium leading-8 w-[40%] text-right">
                                        Total Amount:
                                    </h4>
                                    <h4 className="ms-2 text-base font-normal leading-8 rounded-sm w-1/2 mt-[1px]">
                                        <span className="bg-green-600 text-white px-3 py-0.5 rounded-sm"> BDT. {orderInfo?.total}</span>
                                    </h4>
                                </div>
                                <div className="flex justify-center items-center gap-2 w-[460px]">
                                    <h4 className="text-lg font-medium leading-8 w-[40%] text-right">
                                        Delivery Address:
                                    </h4>
                                    <h4 className="ms-2 text-base font-normal leading-8 w-1/2 mt-[1px]">
                                        {orderInfo?.customerAddress}, {orderInfo?.customerCity}
                                    </h4>
                                </div>
                            </div>
                            <div className="w-1/2 pl-10 pt-2 border-l-2 border-orange-400">
                                <ul className="space-y-5">
                                    {orderInfo?.orderedItems?.map((orderedItem) => <OrderedItem key={orderedItem?.foodId} orderedItemInfo={orderedItem} />)}
                                </ul>
                            </div>
                        </section>
                        <DeliveryTimeline orderInfo={orderInfo} />
                        <div>
                            <h4 className="text-center text-xl font-semibold my-7">Update Delivery Status</h4>
                            <div>
                                {
                                    orderInfo?.deliveryStatus === "Pending" && (
                                        <div className="flex justify-center items-center gap-10">
                                            <button onClick={() => handleUpdateDeliveryStatus("In Kitchen")} className="bg-red-600 text-white px-5 py-2 rounded cursor-pointer text-sm font-medium">
                                                Cancel The Order
                                            </button>
                                        </div>
                                    )
                                }
                                {
                                    orderInfo?.deliveryStatus === "In Kitchen" && (
                                        <div className="flex justify-center items-center gap-10">
                                            <h4 className="text-2xl font-semibold text-green-600 text-center">
                                                Your food is being prepared.
                                            </h4>
                                        </div>
                                    )
                                }
                                {
                                    orderInfo?.deliveryStatus === "In Delivery" && (
                                        <div className="text-center space-y-5">
                                            <h4 className="w-[50%] mx-auto text-xl font-semibold text-green-600 text-center">
                                                Your Food Is Out For Delivery. Confirm The Delivery If You Received Your Food From Our Rider.
                                            </h4>
                                            <button onClick={() => handleUpdateDeliveryStatus("In Kitchen")} className="bg-green-600 text-white px-5 py-2 rounded cursor-pointer text-sm font-medium">
                                                Confirm Delivery
                                            </button>
                                        </div>
                                    )
                                }
                                {
                                    orderInfo?.deliveryStatus === "Delivered" && (
                                        <h4 className="text-2xl font-semibold text-green-600 text-center">Your Food Is Delivered.</h4>
                                    )
                                }
                                {
                                    orderInfo?.deliveryStatus === "Cancelled" && (
                                        <h4 className="text-2xl font-semibold text-red-600 text-center">The Order Is Cancelled.</h4>
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