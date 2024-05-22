"use client";

import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAxiosSecureBusiness from "@/hooks/useAxiosSecureBusiness";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { FcBullish, FcCandleSticks } from "react-icons/fc"

import {
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const OrderByCategory = () => {
    const { user } = useAuth();

    const [axiosSecureBusiness] = useAxiosSecureBusiness();

    const { data: ordersByCategory = [] } = useQuery({
        queryKey: ["tags", user?.email],
        queryFn: async () => {
            try {
                const response = await axios.get(`http://localhost:4000/restaurants/${user?.email}`);

                const tags = response.data.tags;

                if (tags) {
                    const response = await axiosSecureBusiness.get(`http://localhost:4000/orders/restaurant/${user?.email}`);

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
    });

    const { data: mostPopularItems = [] } = useQuery({
        queryKey: ["orderedItems", user?.email],
        queryFn: async () => {
            try {
                if (user?.email) {
                    const response = await axiosSecureBusiness.get(`/menus/${user?.email}`);

                    if (response.status === 200) {
                        const menus = response?.data;

                        if (menus) {
                            const res = await axiosSecureBusiness.get(`/orders/restaurant/${user?.email}`);

                            if (res.status === 200) {
                                const orders = res?.data;

                                let mostPopularFoodItems = [];

                                if (orders) {
                                    for (let i = 0; i < menus.length; i++) {
                                        let count = 0;
                                        for (let j = 0; j < orders.length; j++) {
                                            let orderedItems = orders[j].orderedItems;
                                            for (let k = 0; k < orderedItems.length; k++) {
                                                if (orderedItems[k].foodName === menus[i].foodName) {
                                                    count += orderedItems[k].quantity;
                                                }
                                            }
                                        }
                                        mostPopularFoodItems.push({
                                            foodName: menus[i].foodName,
                                            foodImage: menus[i].foodImage,
                                            foodPrice: menus[i].foodPrice,
                                            count: count
                                        });
                                    }
                                }
                                else {
                                    for (let i = 0; i < menus.length; i++) {
                                        mostPopularFoodItems.push({
                                            foodName: menus[i].foodName,
                                            foodImage: menus[i].foodImage,
                                            foodPrice: menus[i].foodPrice,
                                            count: 0
                                        });
                                    }
                                }
                                let sortedMostPopularFoodItems = mostPopularFoodItems.sort((fItem, sItem) => sItem.count - fItem.count);
                                return sortedMostPopularFoodItems.splice(0, 4);
                            }
                        }
                    }
                }
            } catch (error) {
                console.log(error?.message);
            }
        }
    });

    return (
        <section className="max-w-7xl mx-auto px-4 2xl:px-0 py-14 grid grid-cols-12">
            <div className="col-span-12 xl:col-span-7 bg-orange-200 p-5 md:p-7">
                <div className="flex justify-start items-center gap-5 mb-10">
                    <FcCandleSticks className="text-2xl" />
                    <h4 className="text-xl font-medium">Orders By Category</h4>
                </div>
                <div className="w-full h-[300px]">
                    {
                        !ordersByCategory ? <h4 className="text-xl font-medium text-center mt-12">
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
            <div className="mt-14 xl:mt-0 xl:col-start-9 col-span-12 xl:col-span-4 bg-orange-200 p-5 md:p-7">
                <div className="flex justify-start items-center gap-5">
                    <FcBullish className="text-2xl" />
                    <h4 className="text-xl font-medium">Best Selling Food Items</h4>
                </div>
                {
                    mostPopularItems.length === 0 ? (
                        <h2 className="text-xl font-medium text-center mt-12">Not Enough Data To Show Visualization...</h2>
                    )
                        : (
                            <table className="w-full border-separate border-spacing-y-7" >
                                <tbody>
                                    {mostPopularItems.map((mostPopularItem, index) => {
                                        return (
                                            <tr key={mostPopularItem._id} >
                                                <td className="pr-4 font-semibold text-center">
                                                    {index + 1}.
                                                </td>
                                                <td className="pr-4 w-16 h-16 rounded relative bg-white text-center">
                                                    <Image fill={true} src={mostPopularItem.foodImage} alt="Most popular food item" className="rounded object-cover p-2" />
                                                </td>
                                                <td className="px-8 text-sm font-medium text-center">
                                                    {mostPopularItem.foodName}
                                                </td>
                                                <td className="text-sm font-medium text-center">
                                                    BDT. {mostPopularItem.foodPrice}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        )
                }
            </div>
        </section >
    )
}

export default OrderByCategory;