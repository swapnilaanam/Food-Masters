import Image from "next/image";
import Link from "next/link";

const FeaturedRestaurant = ({ restaurant, picHeight }) => {
    return (
        <div className="flex-1 w-full relative" style={{ height: `${picHeight}%` }}>
            <Link href={`/restaurants/${restaurant?._id}`}>
                <Image fill={true} src={restaurant?.restaurantThumbnail} alt="Featured Restaurants" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 ms-4 mb-5 flex flex-col justify-center items-start gap-4">
                    <h4 className="bg-green-600 text-white px-8 py-2 rounded-sm text-lg font-medium shadow-xl">
                        {restaurant?.restaurantName}
                    </h4>
                    <h6 className="bg-white px-5 py-1.5 font-medium rounded-sm shadow-xl">
                        {restaurant?.city}
                    </h6>
                </div>
            </Link>
        </div>
    )
}

export default FeaturedRestaurant;