"use client"

import useAuth from "@/hooks/useAuth";
import Order from "@/components/Order";
import TopBanner from "@/components/Shared/TopBanner";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useMenu from "@/hooks/useMenu";

const Orders = () => {
    const [currentOption, setCurrentOption] = useState("Current");

    const { user } = useAuth();
    const {setIsMenuOpen} = useMenu();

    const [axiosSecure] = useAxiosSecure();

    const { data: orders = [], refetch: ordersRefetch } = useQuery({
        queryKey: ["orders", user?.email],
        queryFn: async () => {
            try {
                const response = await axiosSecure.get(`/orders/customer/${user?.email}`);

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

    useEffect(() => {
        setIsMenuOpen(false);
    }, [setIsMenuOpen]);

    return (
        <main>
            <TopBanner title="Orders" />
            <section className="max-w-7xl mx-auto pt-14 pb-8 px-4">
                <ul className="flex flex-col md:flex-row justify-center items-center gap-5">
                    <li onClick={() => setCurrentOption("Current")} className={`px-7 py-1.5 rounded-sm text-lg font-medium cursor-pointer hover:bg-green-500 hover:text-white ${currentOption === "Current" ? 'bg-green-600 text-white' : 'bg-orange-200 text-black'}`}>
                        Current Orders
                    </li>
                    <li onClick={() => setCurrentOption("Past")} className={`px-7 py-1.5 rounded-sm text-lg font-medium cursor-pointer hover:bg-green-500 hover:text-white ${currentOption === "Past" ? 'bg-green-600 text-white' : 'bg-orange-200 text-black'}`}>
                        Past Orders
                    </li>
                </ul>
            </section>
            <section className="max-w-7xl mx-auto py-10 px-4 2xl:px-0">
                {
                    orders?.length === 0 ? (
                        <h4 className="text-lg font-medium text-center">No Orders Available To Show...</h4>
                    ) : (
                        <div className="flex justify-center items-center flex-wrap gap-16 overflow-hidden">
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