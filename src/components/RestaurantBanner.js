import React from 'react';
import Link from "next/link";
import video from '../../public/video.mp4'; // Make sure the path is correct

const RestaurantBanner = () => {
    return (
        <section className="py-28">
            <div className="w-full mx-auto h-[600px] relative">
                <div className="w-full h-full">
                    <video autoPlay loop muted className="w-full h-full object-cover">
                        <source src="video.mp4" type="video/mp4" />
                    </video>
                </div>
                <div className="bg-black bg-opacity-70 leading-relaxed w-full h-full absolute top-0 flex flex-col xl:flex-row justify-center items-center px-4 lg:px-20">
                    <div className="flex-1 mx-5 mt-20 xl:mt-0">
                        <h4 className="text-3xl md:text-5xl text-white text-center xl:text-left font-semibold leading-relaxed md:leading-relaxed">
                            Want To Deliver Your Restaurant's Foods To Foodies Home?
                        </h4>
                    </div>
                    <div className="md:mt-12 lg:mt-0 flex-1 flex flex-col gap-12 items-center">
                        <h2 className="text-2xl md:text-4xl text-white font-medium">
                            Try
                            <span className="text-green-500"> Food Masters</span>
                            <span className="text-orange-500"> For Business!</span>
                        </h2>
                        <Link href="/business/dashboard">
                            <button className="md:text-lg bg-green-600 text-white shadow font-medium px-5 md:px-12 py-4 uppercase rounded-sm tracking-widest">
                                Food Masters For Business
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RestaurantBanner;