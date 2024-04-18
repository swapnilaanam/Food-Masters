import React from 'react';
import Link from "next/link";
import video from '../../public/video.mp4'; // Make sure the path is correct

const RestaurantBanner = () => {
    return (
        <section className="py-28">
            <div className="w-full h-[600px] relative">
                <iframe allow="autoplay" src="https://player.vimeo.com/video/926050444?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" className="absolute top-0 left-0 right-0 bottom-0 object-cover w-full h-full"></iframe>
                <div className="bg-black bg-opacity-70 leading-relaxed w-full h-full absolute top-0 flex justify-center items-center px-20">
                    <div className="flex-1 mx-5">
                        <h4 className="text-5xl text-white font-medium">Want To Deliver Your Restaurant's Foods To Foodies Home?</h4>
                        <h2 className="mt-10 text-4xl text-white font-medium">
                            Try
                            <span className="text-green-500"> Food Masters</span>
                            <span className="text-orange-500"> For Business!</span>
                        </h2>
                    </div>
                    <div className="flex-1 flex justify-end">
                        <Link href="/business/dashboard" className="text-xl text-white bg-green-700 shadow font-semibold px-12 py-4 tracking-wider uppercase rounded hover:text-orange-500 hover:bg-white">
                            Join Food Masters As A Restaurant
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RestaurantBanner;