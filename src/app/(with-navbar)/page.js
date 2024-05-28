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
import useMenu from "@/hooks/useMenu";
import { useEffect } from "react";
import Aos from 'aos';
import 'aos/dist/aos.css';


export default function Home() {
  const {setIsMenuOpen} = useMenu();

  useEffect(() => {
    Aos.init();
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [setIsMenuOpen]);

  return (
    <main>
      <HomeBanner />
      <FoodCategories />
      <FeaturedRestaurants />
      <OrderBanner />
      <Features />
      <VouchersBanner />
      <CustomerReview />
      <RestaurantBanner />
      <FAQS />
      <PaymentPartners />
      <Footer />
    </main>
  )

}