import { FcMoneyTransfer, FcPaid } from "react-icons/fc"
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const CustomerDashboardStats = ({orders, totalSpent, totalPendingOrders, totalDeliveredOrders, totalCancelledOrders}) => {
    const ordersData = [
        { name: 'Pending Orders', value: totalPendingOrders?.length },
        { name: 'Delivered Orders', value: totalDeliveredOrders?.length, fill: 'rgb(22, 163, 74)' },
        { name: 'Cancelled Orders', value: totalCancelledOrders?.length, fill: 'red' },
    ];

    return (
        <div className="py-20 max-w-7xl mx-auto flex flex-wrap xl:flex-nowrap justify-center gap-16 xl:gap-12 2xl:gap-16 px-4">
            <div className="bg-orange-200
             p-10 w-96 h-56 rounded drop-shadow-lg flex flex-col justify-center items-center">
                <div className="flex justify-center items-center gap-5">
                    <FcPaid className="text-4xl" />
                    <h4 className="text-2xl font-medium">Total Orders</h4>
                </div>
                <h6 className="text-3xl font-medium text-center mt-5">{orders?.length}</h6>
            </div>
            <div className="bg-orange-200 p-10 w-96 h-56 rounded drop-shadow-lg flex flex-col justify-center items-center">
                <div className="flex justify-center items-center gap-5">
                    <FcMoneyTransfer className="text-3xl" />
                    <h4 className="text-2xl font-medium">Total Spent</h4>
                </div>
                <h6 className="text-3xl font-medium text-center mt-5">BTD. {totalSpent}</h6>
            </div>
            <div className="bg-orange-200 p-2 w-96 h-56 rounded drop-shadow-lg flex flex-col justify-center items-center">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={100} height={100}>
                        <Pie
                            dataKey="value"
                            isAnimationActive={true}
                            data={ordersData}
                            cx="50%"
                            cy="50%"
                            outerRadius={60}
                            fill="#8884d8"
                            label
                        />
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

        </div>
    )
}

export default CustomerDashboardStats