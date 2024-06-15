import Image from "next/image";
import OrderBannerImg from "@/assets/image/order-banner.jpg";
import Link from "next/link";


const OrderBanner = () => {
    return (
        <section className="my-28">
            <div className="w-full h-[600px] bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${OrderBannerImg.src})` }}>
                <div className="px-4 lg:px-0 lg:ps-14 w-full lg:w-[40%] h-full flex flex-col justify-center items-center">
                    <h4 className="text-white text-2xl md:text-5xl text-center md:leading-snug font-medium">
                        Get The Best Grilled & Tandoori Items At <span className="text-green-500 ms-2 whitespace-nowrap">Great Price !</span>
                    </h4>
                    <Link href="/restaurants" className="mt-10 bg-green-600 text-white text-2xl font-medium px-14 py-3 rounded-sm">Order Now</Link>
                </div>
            </div>
        </section>
    )
};

export default OrderBanner;