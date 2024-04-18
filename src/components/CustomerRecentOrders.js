"use client";

import Link from "next/link";
import { FcShipped } from "react-icons/fc"

const CustomerRecentOrders = ({recentOrders}) => {

    return (
        <>
            <div className="flex justify-between items-start mb-4">
                <div className="flex justify-start items-center gap-5">
                    <FcShipped className="text-xl" />
                    <h4 className="text-xl font-medium">Recent Orders</h4>
                </div>
                <Link href={'/orders'} className="bg-green-600 text-sm text-white px-10 py-2 rounded">All Orders</Link>
            </div>
            <div>
                {
                    recentOrders?.length === 0 ? (
                        <h4 className="text-lg font-medium mt-12">No Orders Received Yet...</h4>
                    )
                        : (
                            <table className="w-full table-sm border-separate border-spacing-y-7">
                                <thead>
                                    <tr className="rounded-sm">
                                        <th className="bg-green-600 text-white text-xs py-2 rounded-l-sm">Order Id</th>
                                        <th className="bg-green-600 text-white text-xs py-2">Ordered Items</th>
                                        <th className="bg-green-600 text-white text-xs py-2">Order Total</th>
                                        <th className="bg-green-600 text-white text-xs py-2 rounded-r-sm">Delivery Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        recentOrders.map((recentOrder, index) => {
                                            if(index > 2) {
                                                return
                                            };

                                            return (
                                                <tr key={recentOrder?._id} className="bg-white text-xs">
                                                    <td className="px-2 py-2 text-center rounded-l-sm">{recentOrder._id}</td>
                                                    <td className="px-4 py-2 text-center">{recentOrder?.orderedItems?.reduce((prev, current) => {
                                                        return prev + current.quantity
                                                    }, 0)}</td>
                                                    <td className="px-4 py-2 text-center">BDT. {recentOrder.total}</td>
                                                    <td className="px-4 py-2 text-center rounded-r-sm">{recentOrder?.deliveryStatus}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        )
                }
            </div>
        </>
    )
}

export default CustomerRecentOrders