import { FcCellPhone, FcClock } from "react-icons/fc"
import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("@/components/DynamicMap"), { ssr: false });

const RestaurantInfo = ({ restaurant }) => {

    return (
        <section>
            <div>
                <h4 className="text-2xl mb-4">Working Hours</h4>
                <div className="flex justify-start items-center gap-3 ms-4">
                    <FcClock className="text-4xl" />
                    <h6 className="text-lg">{restaurant?.openingTime} - {restaurant?.closingTime}</h6>
                </div>
                <h4 className="text-2xl my-4">Contact Number</h4>
                <div className="flex justify-start items-center gap-3 ms-4">
                    <FcCellPhone className="text-4xl" />
                    <h6 className="text-lg tracking-wider">{restaurant?.restaurantPhoneNumber}</h6>
                </div>
                <h4 className="text-2xl my-4">Location</h4>
                <div className="w-full overflow-hidden">
                    <DynamicMap restaurant={restaurant} />
                </div>
            </div>
        </section>
    )
}

export default RestaurantInfo;