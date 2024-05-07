'use client';

import FeaturedRestaurants from "@/components/FeaturedRestaurants";
import Features from "@/components/Features";
import FoodCategories from "@/components/FoodCategories";
import HomeBanner from "@/components/HomeBanner";

import './style.css';
import OrderBanner from "@/components/OrderBanner";
import CustomerReview from "@/components/CustomerReview";
import RestaurantBanner from "@/components/RestaurantBanner";
import Footer from "@/components/Shared/Footer";
import VouchersBanner from "@/components/VouchersBanner";
import PaymentPartners from "@/components/PaymentPartners";
import FAQS from "@/components/FAQS";


export default function Home() {

  return (
    <main>
      <HomeBanner />
      <FoodCategories />
      <FeaturedRestaurants />
      <VouchersBanner />
      <Features />
      <OrderBanner />
      <CustomerReview />
      <RestaurantBanner />
      <FAQS />
      <PaymentPartners />
      <Footer />
    </main>
  )
}
