"use client";

import useAuth from "@/app/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FcCandleSticks } from "react-icons/fc"

import {
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const OrderByCategory = () => {
    const { user } = useAuth();

    const { data: ordersByCategory = [] } = useQuery({
        queryKey: ["tags", user?.email],
        queryFn: async () => {
            try {
                const response = await axios.get(`http://localhost:5000/restaurants/${user?.email}`);

                const tags = response.data.tags;

                if (tags) {
                    const response = await axios.get(`http://localhost:5000/orders//restaurant/${user?.email}`);

                    const orders = response.data;

                    let orderByCategory = [];

                    if (orders) {
                        tags.map((tag) => {
                            let count = 0;
                            orders.map((order) => {
                                order.orderedItems.map((orderedItem) => {
                                    if (orderedItem.foodCategory === tag) {
                                        count += orderedItem.quantity;
                                    }
                                });
                            });
                            orderByCategory.push({ tagName: tag, count: count });
                        });
                        return orderByCategory;
                    }
                    else {
                        tags.map(tag => {
                            orderByCategory.push({ tagName: tag, count: 0 });
                        });
                        return orderByCategory;
                    }
                }
            } catch (error) {
                console.log(error?.message);
            }
        }
    })

    return (
        <section className="max-w-7xl mx-auto py-14 grid grid-cols-12">
            <div className="col-span-8 bg-orange-200 p-7">
                <div className="flex justify-start items-center gap-5 mb-10">
                    <FcCandleSticks className="text-2xl" />
                    <h4 className="text-xl font-medium">Orders By Category</h4>
                </div>
                <div className="w-full h-[300px]">
                    {
                        !ordersByCategory ? <h4 className="text-xl font-medium text-center">
                            Not Enough Data To Show Visualization...
                        </h4>
                            :
                            (
                                <ResponsiveContainer width="100%" height="100%">
                                    <ComposedChart
                                        width={500}
                                        height={400}
                                        data={ordersByCategory}
                                        margin={{
                                            top: 20,
                                            right: 20,
                                            bottom: 20,
                                            left: 20,
                                        }}
                                    >
                                        <XAxis dataKey="tagName" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="count" barSize={20} fill="#4CAF50" />
                                        <Line type="monotone" dataKey="count" stroke="red" />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            )
                    }
                </div>
            </div>
        </section>
    )
}

export default OrderByCategory