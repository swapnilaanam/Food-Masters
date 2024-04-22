'use client';

import useAuth from "@/app/hooks/useAuth"
import CustomerDashboardStats from "@/components/CustomerDashboardStats";
import CustomerRecentOrders from "@/components/CustomerRecentOrders";
import TopBanner from "@/components/Shared/TopBanner"
import { useQuery } from "@tanstack/react-query"
import axios from "axios";
import { useState } from "react";

const Dashboard = () => {
    const [totalPendingOrders, setTotalPendingOrders] = useState(0);
    const [totalDeliveredOrders, setTotalDeliveredOrders] = useState(0);
    const [totalCancelledOrders, setTotalCancelledOrders] = useState(0);
    const [totalSpent, setTotalSpent] = useState(0);
    const { user } = useAuth();

    const { data: orders = [] } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            try {
                if (user?.email) {
                    const response = await axios.get(`http://localhost:4000/orders/customer/${user?.email}`);

                    if (response?.status === 200) {
                        const deliveredOrders = response?.data?.filter((order) => order?.deliveryStatus === "Delivered");

                        setTotalSpent(deliveredOrders.reduce((total, currentOrder) => total + currentOrder.total, 0));

                        setTotalPendingOrders(response?.data?.filter((order) => order?.deliveryStatus === 'Pending'));
                        setTotalDeliveredOrders(deliveredOrders);
                        setTotalCancelledOrders(response?.data?.filter((order) => order?.deliveryStatus === 'Cancelled'));

                        return response?.data;
                    }
                }
            } catch (error) {
                console.log(error?.message);
            }
        }
    });

    return (
        <section>
            <TopBanner title="Customer Dashboard" />
            <CustomerDashboardStats orders={orders} totalSpent={totalSpent} totalPendingOrders={totalPendingOrders} totalDeliveredOrders={totalDeliveredOrders} totalCancelledOrders={totalCancelledOrders} />
            <div className="max-w-7xl mx-auto flex justify-center items-start gap-20 pb-20">
                <div className="flex-1 bg-orange-200 p-10 rounded-sm">
                    <h2 className="text-2xl font-semibold mb-12">Personal Information</h2>
                    <div className="ms-4 space-y-4">
                        <h4 className="text-xl font-medium">
                            Name:
                            <span className="ms-4 text-lg font-normal">{user?.displayName}</span>
                        </h4>
                        <h4 className="text-xl font-medium">
                            Email:
                            <span className="ms-4 text-lg font-normal">{user?.email}</span>
                        </h4>
                    </div>
                </div>
                <div className="flex-1 bg-orange-200 p-10 rounded-sm">
                    <CustomerRecentOrders recentOrders={orders} />
                </div>
            </div>
        </section>
    )
}

export default Dashboard