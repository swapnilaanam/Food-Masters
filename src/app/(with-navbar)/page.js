'use client';

import FeaturedRestaurants from "@/components/FeaturedRestaurants";
import Features from "@/components/Features";
import FoodCategories from "@/components/FoodCategories";
import HomeBanner from "@/components/HomeBanner";

import './style.css';
import OrderBanner from "@/components/OrderBanner";
import CustomerReview from "@/components/CustomerReview";
import RestaurantBanner from "@/components/RestaurantBanner";


export default function Home() {

  return (
    <main>
      <HomeBanner />
      <FoodCategories />
      <FeaturedRestaurants />
      <OrderBanner />
      <Features />
      <RestaurantBanner />
      <CustomerReview />
    </main>
  )
}
