"use client";

import useAuth from "@/hooks/useAuth"
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAxiosSecureBusiness from "@/hooks/useAxiosSecureBusiness";
import { useQuery } from "@tanstack/react-query"
import Link from "next/link";
import { FcShipped } from "react-icons/fc"

const RecentOrders = () => {
  const { user } = useAuth();

  const [axiosSecureBusiness] = useAxiosSecureBusiness();

  const { data: recentOrders = [] } = useQuery({
    queryKey: ["recentOrders", user?.email],
    queryFn: async () => {
      try {
        const response = await axiosSecureBusiness.get(`/orders/restaurant/${user?.email}`);

        if (response.status === 200) {
          return response?.data;
        }
      } catch (error) {
        console.log(error?.message);
      }
    }
  });

  return (
    <section className="max-w-7xl mx-auto py-14 px-4 2xl:px-0">
      <div className="col-span-12 bg-orange-200 p-7">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-4 gap-5 md:gap-0">
          <div className="flex justify-start items-center gap-5">
            <FcShipped className="text-2xl" />
            <h4 className="text-xl font-medium">Recent Orders</h4>
          </div>
          <Link href={'/business/orders'} className="bg-green-600 text-white px-7 py-2 rounded">All Orders</Link>
        </div>
        <div>
          {
            recentOrders?.length === 0 ? (
              <h4 className="text-lg font-medium mt-12">No Orders Received Yet...</h4>
            )
              : (
                <div className="overflow-auto">
                  <table className="w-full table-sm border-separate border-spacing-y-7">
                    <thead>
                      <tr>
                        <th className="hidden lg:block text-white text-xs py-2 rounded-l-sm"></th>
                        <th className="bg-green-600 text-white text-xs py-2 rounded-l-sm">
                          Order Id
                        </th>
                        <th className="hidden lg:block bg-green-600 text-white text-xs py-2 rounded-l-sm">
                          Customer Name
                        </th>
                        <th className="bg-green-600 text-white text-xs py-2 rounded-l-sm">
                          Ordered Items
                        </th>
                        <th className="bg-green-600 text-white text-xs py-2 rounded-l-sm">
                          Order Total
                        </th>
                        <th className="bg-green-600 text-white text-xs py-2 rounded-l-sm">
                          Delivery Status
                        </th>
                        <th className="bg-green-600 text-white text-xs py-2 rounded-l-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        recentOrders.map((recentOrder, index) => {
                          return (
                            <tr key={recentOrder?._id} className="bg-white text-xs">
                              <td className="hidden lg:block px-2 py-4 text-center rounded-l-sm">
                                {index + 1}.
                              </td>
                              <td className="px-2 py-4 text-center rounded-l-sm">
                                {recentOrder._id}
                              </td>
                              <td className="hidden lg:block px-2 py-4 text-center rounded-l-sm">
                                {recentOrder?.customerName}
                              </td>
                              <td className="px-2 py-4 text-center rounded-l-sm">
                                {recentOrder?.orderedItems?.reduce((prev, current) => {
                                  return prev + current.quantity
                                }, 0)}
                              </td>
                              <td className="px-2 py-4 text-center rounded-l-sm">
                                BDT. {recentOrder.total}
                              </td>
                              <td className="px-2 py-4 text-center rounded-l-sm">
                                {recentOrder?.deliveryStatus}
                              </td>
                              <td className="px-2 py-4 text-center rounded-l-sm">
                                <Link href={`/business/orders/${recentOrder?._id}`} className="w-full bg-green-600 text-white px-5 md:px-7 py-2 rounded whitespace-nowrap" >
                                  View Details
                                </Link>
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
              )
          }
        </div>
      </div>
    </section>
  )
}

export default RecentOrders;