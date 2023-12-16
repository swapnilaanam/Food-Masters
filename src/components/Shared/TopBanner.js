import Image from "next/image";
import restaurantsBannerImg from "@/assets/image/restaurant-banner.jpg";

const TopBanner = ({title}) => {
    return (
        <section>
            <div className="w-full h-[500px] relative">
                <Image fill={true} src={restaurantsBannerImg} alt="Restaurants Banner" className="w-full h-full object-cover object-top" />
                <div className="absolute top-0 w-full h-full flex justify-center items-center">
                    <h1 className="bg-green-600 text-white text-4xl tracking-wider font-semibold px-14 py-3.5 rounded shadow-xl">
                        {title}
                    </h1>
                </div>
            </div>
        </section>
    )
};

export default TopBanner;