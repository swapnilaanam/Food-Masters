"use client"

import useAuth from "@/hooks/useAuth";
import Order from "@/components/Order";
import TopBanner from "@/components/Shared/TopBanner";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

const Orders = () => {
    const [currentOption, setCurrentOption] = useState("Current");

    const { user } = useAuth();

    const { data: orders = [], refetch: ordersRefetch } = useQuery({
        queryKey: ["orders", user?.email],
        queryFn: async () => {
            try {
                const response = await axios.get(`http://localhost:4000/orders/customer/${user?.email}`);

                if (response.status === 200) {
                    if (currentOption === "Current") {
                        return response?.data?.filter((order) => (order?.deliveryStatus !== "Delivered" && order?.deliveryStatus !== "Cancelled")).reverse();
                    }
                    else {
                        return response?.data?.filter((order) => (order?.deliveryStatus === "Delivered" || order?.deliveryStatus === "Cancelled"));
                    }
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
            <TopBanner title="Orders" />
            <section className="max-w-7xl mx-auto pt-14 pb-8">
                <ul className="flex justify-center items-center gap-5">
                    <li onClick={() => setCurrentOption("Current")} className={`px-7 py-1.5 rounded-sm text-lg font-medium cursor-pointer hover:bg-green-500 hover:text-white ${currentOption === "Current" ? 'bg-green-600 text-white' : 'bg-orange-200 text-black'}`}>
                        Current Orders
                    </li>
                    <li onClick={() => setCurrentOption("Past")} className={`px-7 py-1.5 rounded-sm text-lg font-medium cursor-pointer hover:bg-green-500 hover:text-white ${currentOption === "Past" ? 'bg-green-600 text-white' : 'bg-orange-200 text-black'}`}>
                        Past Orders
                    </li>
                </ul>
            </section>
            <section className="max-w-7xl mx-auto py-10">
                {
                    orders?.length === 0 ? (
                        <h4 className="text-lg font-medium text-center">No Orders Available To Show...</h4>
                    ) : (
                        <div className="flex justify-center items-center flex-wrap gap-16">
                            {
                                orders?.map((order) => <Order key={order?._id} order={order} ordersRefetch={ordersRefetch} />)
                            }
                        </div>
                    )
                }
            </section>
        </main>
    )
}

export default Orders;