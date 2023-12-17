import { FcClock } from "react-icons/fc"

const RestaurantInfo = ({ restaurant }) => {
    return (
        <section>
            <div>
                <h4 className="text-2xl mb-4">Working Hours</h4>
                <div className="flex justify-start items-center gap-3 ms-4">
                    <FcClock className="text-4xl" />
                    <h6 className="text-lg">{restaurant?.openingTime} - {restaurant?.closingTime}</h6>
                </div>
            </div>
        </section>
    )
}

export default RestaurantInfo