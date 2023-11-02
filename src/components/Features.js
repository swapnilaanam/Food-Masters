"use client"

import Lottie from "lottie-react";

import deliveryAnimation from '@/assets/animation/deliveryAnimation.json';
import restaurantAnimation from '@/assets/animation/restaurantAnimation.json';
import dealsAnimation from '@/assets/animation/dealsAnimation.json';

const Features = () => {
  return (
    <section className="my-24">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-center text-3xl font-medium tracking-wide mb-28">Why We Are The Masters Of Food Delivery</h2>
            <div className="flex justify-between items-center gap-28">
                <div className="bg-green-100 pb-10 px-4 rounded-sm flex flex-col justify-center items-center w-[342px]">
                    <div className="w-60 h-60">
                        <Lottie animationData={deliveryAnimation} />
                    </div>
                    <h4 className="text-center text-xl font-medium">Lightning Fast Delivery</h4>
                    <p className="mt-5 mx-2 text-center text-slate-600">We deliver your food within 30 minutes of pickup from restaurants.</p>
                </div>
                <div className="bg-green-100 pb-10 px-5 rounded-sm flex flex-col justify-center items-center w-[342px]">
                    <div className="w-60 h-60">
                        <Lottie animationData={restaurantAnimation} />
                    </div>
                    <h4 className="text-center text-xl font-medium">Your Favourite Restaurants</h4>
                    <p className="mt-5 mx-2 text-center text-slate-600">All your favourite restaurants are available at Food Masters.</p>
                </div>
                <div className="bg-green-100 pb-10 px-5 rounded-sm flex flex-col justify-center items-center w-[342px]">
                    <div className="w-60 h-60">
                        <Lottie animationData={dealsAnimation} />
                    </div>
                    <h4 className="text-center text-xl font-medium">Exciting Deals & Offers</h4>
                    <p className="mt-5 mx-2 text-center text-slate-600">We express our love by giving exclusive offers and discounts.</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Features