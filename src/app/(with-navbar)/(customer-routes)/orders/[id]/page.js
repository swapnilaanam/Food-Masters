"use client";

import DeliveryTimeline from "@/components/Shared/DeliveryTimeline";
import OrderedItem from "@/components/Shared/OrderedItem";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useMenu from "@/hooks/useMenu";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SingleOrder = () => {
    const [totalOrderNumber, setTotalOrderNumber] = useState(0);

    const { id } = useParams();

    const [axiosSecure] = useAxiosSecure();

    const {setIsMenuOpen} = useMenu();

    const { data: orderInfo = {}, refetch: orderInfoRefetch } = useQuery({
        queryKey: ["orderInfo", id],
        queryFn: async () => {
            try {
                const response = await axiosSecure.get(`/orders/order/${id}`);
                return response?.data;
            } catch (error) {
                console.log(error?.message);
            }
        }
    });

    useEffect(() => {
        setIsMenuOpen(false);
    }, [setIsMenuOpen]);

    useEffect(() => {
        setTotalOrderNumber(orderInfo?.orderedItems?.reduce((total, prev) => total + prev.quantity, 0));
    }, [orderInfo]);

    const handleUpdateDeliveryStatus = async (status) => {
        try {
            const response = await axiosSecure.patch(`/orders/${orderInfo?._id}`, {
                deliveryStatus: status
            });

            if (response.status === 200 && status !== 'Cancelled') {
                toast.success(`Order is now ${status}`);
                orderInfoRefetch();
            }

            if (response.status === 200 && status === 'Cancelled') {
                toast.error(`Order is now ${status}`);
                orderInfoRefetch();
            }

        } catch (error) {
            console.log(error?.message)
        }
    }

    return (
        <main>
            <section className="py-20 px-4 2xl:px-0">
                <div className="max-w-7xl mx-auto bg-orange-100 px-4 py-10 sm:px-6 sm:py-10 lg:px-7 rounded-sm shadow-lg">
                    <div className="lg:px-24">
                        <header className="text-center">
                            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl mb-10">Order Info</h1>
                        </header>
                        <section className="flex flex-col xl:flex-row xl:justify-center justify-stretch xl:items-stretch items-center">
                            <div className="w-full xl:w-1/2 space-y-1 pb-12 xl:pb-0">
                                <div className="flex flex-col md:flex-row justify-center items-center gap-2 w-full xl:w-[460px]">
                                    <h4 className="text-lg font-medium leading-8 w-full lg:w-[40%] text-center md:text-right">
                                        Order Number:
                                    </h4>
                                    <h4 className="md:ms-2 text-base font-normal leading-8 w-full lg:w-1/2 mt-[1px] text-center md:text-left">{orderInfo?._id}</h4>
                                </div>
                                <div className="flex flex-col md:flex-row justify-center items-center gap-2 w-full xl:w-[460px]">
                                    <h4 className="text-lg font-medium leading-8 w-full lg:w-[40%] text-center md:text-right">
                                        Customer Name:
                                    </h4>
                                    <h4 className="md:ms-2 text-base font-normal leading-8 w-full lg:w-1/2 mt-[1px] text-center md:text-left">{orderInfo?.customerName}</h4>
                                </div>
                                <div className="flex flex-col md:flex-row justify-center items-center gap-2 w-full xl:w-[460px]">
                                    <h4 className="text-lg font-medium leading-8 w-full lg:w-[40%] text-center md:text-right">
                                        Restaurant Name:
                                    </h4>
                                    <h4 className="md:ms-2 text-base font-normal leading-8 w-full lg:w-1/2 mt-[1px] text-center md:text-left">{orderInfo?.restaurantName}</h4>
                                </div>
                                <div className="flex flex-col md:flex-row justify-center items-center gap-2 w-full xl:w-[460px]">
                                    <h4 className="text-lg font-medium leading-8 w-full lg:w-[40%] text-center md:text-right">
                                        Order Quantity:
                                    </h4>
                                    <h4 className="md:ms-2 text-base font-normal leading-8 rounded-sm w-full lg:w-1/2 mt-[1px] text-center md:text-left">
                                        <span className="bg-slate-800 text-white px-4 py-0.5 rounded-sm">{totalOrderNumber}</span>
                                    </h4>
                                </div>
                                <div className="flex flex-col md:flex-row justify-center items-center gap-2 w-full xl:w-[460px]">
                                    <h4 className="text-lg font-medium leading-8 w-full lg:w-[40%] text-center md:text-right">
                                        Total Amount:
                                    </h4>
                                    <h4 className="lg:ms-2 text-base font-normal leading-8 rounded-sm w-full lg:w-1/2 mt-[1px] text-center md:text-left">
                                        <span className="bg-green-600 text-white px-3 py-0.5 rounded-sm"> BDT. {orderInfo?.total}</span>
                                    </h4>
                                </div>
                                <div className="flex flex-col md:flex-row justify-center items-center gap-2 w-full xl:w-[460px]">
                                    <h4 className="text-lg font-medium leading-8 w-full lg:w-[40%] text-center md:text-right">
                                        Delivery Address:
                                    </h4>
                                    <h4 className="md:ms-2 text-base font-normal leading-8 w-full lg:w-1/2 mt-[1px] text-center md:text-left">
                                        {orderInfo?.customerAddress}, {orderInfo?.customerCity}
                                    </h4>
                                </div>
                            </div>
                            <div className="w-full xl:w-1/2 xl:pl-10 pt-12 xl:pt-2 border-t-2 xl:border-t-0 xl:border-l-2 border-orange-400">
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
                                            <button onClick={() => handleUpdateDeliveryStatus("Cancelled")} className="bg-red-600 text-white px-5 py-2 rounded cursor-pointer text-sm font-medium">
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
                                            <h4 className="w-full lg:w-[50%] mx-auto text-xl font-semibold text-green-600 text-center">
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