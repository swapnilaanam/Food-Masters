import DashboardBanner from "@/components/Business/DashboardBanner";
import OrderByCategory from "@/components/Business/OrderByCategory";
import RecentOrders from "@/components/Business/RecentOrders";

const Dashboard = () => {
  return (
    <main>
      <DashboardBanner />
      <OrderByCategory />
      <RecentOrders />
    </main>
  )
}

export default Dashboard;