import FeaturedRestaurants from "@/components/FeaturedRestaurants";
import Features from "@/components/Features";
import FoodCategories from "@/components/FoodCategories";
import HomeBanner from "@/components/HomeBanner";

import './style.css';
import OrderBanner from "@/components/OrderBanner";
import CustomerReview from "@/components/CustomerReview";


export default function Home() {
  return (
    <main>
      <HomeBanner />
      <FoodCategories />
      <FeaturedRestaurants />
      <Features />
      <OrderBanner />
      <CustomerReview />
    </main>
  )
}
