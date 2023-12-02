import restaurantBannerVideo from "@/assets/video/restaurantBannerVideo.mp4";
import Link from "next/link";

const RestaurantBanner = () => {
    return (
        <section className="py-28">
            <div className="w-full h-[600px] relative">
                <video className="w-full h-full object-cover" autoPlay={true} muted={true} loop={true}>
                    <source src={restaurantBannerVideo} type="video/mp4"></source>
                </video>
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

export default RestaurantBanner