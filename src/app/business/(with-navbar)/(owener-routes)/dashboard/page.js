'use client';

import DashboardBanner from "@/components/Business/DashboardBanner";
import OrderByCategory from "@/components/Business/OrderByCategory";
import RecentOrders from "@/components/Business/RecentOrders";
import BusinessBanner from "@/components/Shared/BusinessBanner";
import useBusinessMenu from "@/hooks/useBusinessMenu";
import { useEffect } from "react";

const Dashboard = () => {
  const {setIsBusinessMenuOpen} = useBusinessMenu();

  useEffect(() => {
    setIsBusinessMenuOpen(false);
  }, [setIsBusinessMenuOpen]);

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