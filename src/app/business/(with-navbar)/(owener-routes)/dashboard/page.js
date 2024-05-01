import DashboardBanner from "@/components/Business/DashboardBanner";
import OrderByCategory from "@/components/Business/OrderByCategory";
import RecentOrders from "@/components/Business/RecentOrders";
import BusinessBanner from "@/components/Shared/BusinessBanner";

const Dashboard = () => {
  return (
    <main>
      <BusinessBanner title="Dashboard" />
      <DashboardBanner />
      <OrderByCategory />
      <RecentOrders />
    </main>
  )
}

export default Dashboard;