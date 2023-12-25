"use client";

import useAuth from "@/app/hooks/useAuth"
import { useQuery } from "@tanstack/react-query"
import axios from "axios";
import Link from "next/link";
import { FcShipped } from "react-icons/fc"

const RecentOrders = () => {
  const { user } = useAuth();

  const { data: recentOrders = [] } = useQuery({
    queryKey: ["recentOrders", user?.email],
    queryFn: async () => {
      try {
        const response = await axios.get(`http://localhost:5000/orders/restaurant/${user?.email}`);

        if (response.status === 200) {
          return response?.data;
        }
      } catch (error) {
        console.log(error?.message);
      }
    }
  });

  return (
    <section className="max-w-7xl mx-auto py-14">
      <div className="col-span-12 bg-orange-200 p-7">
        <div className="flex justify-between items-start mb-4">
          <div className="flex justify-start items-center gap-5">
            <FcShipped className="text-2xl" />
            <h4 className="text-xl font-medium">Recent Orders</h4>
          </div>
          <Link href={'/orders'} className="bg-green-600 text-white px-7 py-2 rounded">All Orders</Link>
        </div>
        <div>
          {
            recentOrders?.length === 0 ? (
              <h4 className="text-lg font-medium mt-12">No Orders Received Yet...</h4>
            )
              : (
                <table className="w-full table-sm border-separate border-spacing-y-7">
                  <thead>
                    <tr>
                      <th></th>
                      <th className="bg-green-600 text-white py-2">Order Id</th>
                      <th className="bg-green-600 text-white py-2">Customer Name</th>
                      <th className="bg-green-600 text-white py-2">Ordered Items</th>
                      <th className="bg-green-600 text-white py-2">Order Total</th>
                      <th className="bg-green-600 text-white py-2">Delivery Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      recentOrders.map((recentOrder, index) => {
                        return (
                          <tr key={recentOrder?._id} className="bg-white">
                            <td className="px-4 py-4 text-center rounded-l">{index + 1}.</td>
                            <td className="px-2 text-center">{recentOrder._id}</td>
                            <td className="px-2 text-center">{recentOrder?.customerName}</td>
                            <td className="px-4 text-center">{recentOrder?.orderedItems?.reduce((prev, current) => {
                              return prev + current.quantity
                            }, 0)}</td>
                            <td className="px-4 text-center">{recentOrder.total}</td>
                            <td className="px-4 text-center">{recentOrder?.deliveryStatus}</td>
                            <td className="text-center rounded">
                              <Link href={`/orders/${recentOrder?._id}`} className="bg-green-600 text-white px-7 py-2 rounded" >
                                View Details
                              </Link>
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              )
          }
        </div>
      </div>
    </section>
  )
}

export default RecentOrders