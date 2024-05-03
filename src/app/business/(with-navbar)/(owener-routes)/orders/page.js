"use client";

import useAuth from "@/hooks/useAuth";
import Order from "@/components/Business/Order";
import BusinessBanner from "@/components/Shared/BusinessBanner"
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useAxiosSecureBusiness from "@/hooks/useAxiosSecureBusiness";

const Orders = () => {
    const [currentOption, setCurrentOption] = useState("Pending");

    const { user } = useAuth();

    const [axiosSecureBusiness] = useAxiosSecureBusiness();

    const { data: orders = [], refetch: ordersRefetch } = useQuery({
        queryKey: ["orders", user?.email],
        queryFn: async () => {
            try {
                const response = await axiosSecureBusiness.get(`/orders/restaurant/${user?.email}`);

                if (response.status === 200) {
                    // console.log(response);
                    if (currentOption === "All") {
                        return response?.data.reverse();
                    }
                    else {
                        return response.data.filter((order) => order.deliveryStatus === currentOption);
                    }
                }
                else {
                    throw Error("Something Went Wrong");
                }
            } catch (error) {
                console.log(error?.message);
            }
        }
    });

    useEffect(() => {
        ordersRefetch();
    }, [currentOption, ordersRefetch]);

    return (
        <main>
            <BusinessBanner title="Orders" />
            <section className="max-w-7xl mx-auto">
                <section className="py-20 ">
                    <div className="flex justify-center items-start gap-10 flex-wrap">
                        <div onClick={() => setCurrentOption("All")} className={`px-7 py-2 text-lg font-medium rounded cursor-pointer uppercase text-wide ${currentOption === "All" ? "bg-green-600 text-white" : "bg-orange-200 text-black"}`}>
                            All
                        </div>
                        <div onClick={() => setCurrentOption("Pending")} className={`px-7 py-2 text-lg font-medium rounded cursor-pointer uppercase text-wide ${currentOption === "Pending" ? "bg-green-600 text-white" : "bg-orange-200 text-black"}`}>
                            Pending
                        </div>
                        <div onClick={() => setCurrentOption("In Kitchen")} className={`px-7 py-2 text-lg font-medium rounded cursor-pointer uppercase text-wide ${currentOption === "In Kitchen" ? "bg-green-600 text-white" : "bg-orange-200 text-black"}`}>
                            In Kitchen
                        </div>
                        <div onClick={() => setCurrentOption("In Delivery")} className={`px-7 py-2 text-lg font-medium rounded cursor-pointer uppercase text-wide ${currentOption === "In Delivery" ? "bg-green-600 text-white" : "bg-orange-200 text-black"}`}>
                            In Delivery
                        </div>
                        <div onClick={() => setCurrentOption("Delivered")} className={`px-7 py-2 text-lg font-medium rounded cursor-pointer uppercase text-wide ${currentOption === "Delivered" ? "bg-green-600 text-white" : "bg-orange-200 text-black"}`}>
                            Delivered
                        </div>
                        <div onClick={() => setCurrentOption("Cancelled")} className={`px-7 py-2 text-lg font-medium rounded cursor-pointer uppercase text-wide ${currentOption === "Cancelled" ? "bg-green-600 text-white" : "bg-orange-200 text-black"}`}>
                            Cancelled
                        </div>
                    </div>
                </section>
                <section className="pb-20 flex justify-center items-center flex-wrap gap-20 relative">
                    {
                        orders?.length === 0 ? <h4 className="text-xl font-medium text-center py-16">
                            No Orders To Show...
                        </h4> : orders.map((order, index) => <Order key={order?._id} order={order} ordersRefetch={ordersRefetch} />)
                    }
                </section>
            </section>
        </main>
    )
}

export default Orders;