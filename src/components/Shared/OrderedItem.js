import Image from "next/image"

const OrderedItem = ({orderedItemInfo}) => {
    return (
        <li key={orderedItemInfo?.foodId} className="flex justify-normal md:justify-center xl:justify-normal items-center gap-10">
            <div className="w-16 h-16 relative">
                <Image
                    fill={true}
                    src={orderedItemInfo?.foodImage}
                    alt="Food"
                    className="h-16 w-16 rounded object-cover"
                />
            </div>

            <div>
                <h3 className="text-lg text-gray-900">{orderedItemInfo?.foodName}</h3>

                <dl className="mt-1 space-y-px text-sm text-gray-600">
                    <div>
                        <dt className="inline">Food Category: </dt>
                        <dd className="inline">{orderedItemInfo?.foodCategory}</dd>
                    </div>

                    <div>
                        <dt className="inline">Price: </dt>
                        <dd className="inline">{orderedItemInfo?.foodPrice} Tk.</dd>
                    </div>
                </dl>
            </div>

            <div className="flex xl:flex-1 items-center xl:justify-end gap-2 xl:pr-14">
                <form>
                    <label htmlFor="Line1Qty" className="sr-only"> Quantity </label>

                    <div className="flex justify-center items-center gap-3">
                        <input
                            type="number"
                            min="1"
                            value={`${orderedItemInfo?.quantity}`}
                            id="Line1Qty"
                            className="h-8 w-12 rounded border-gray-100 bg-white p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                            disabled
                        />
                    </div>
                </form>
            </div>
        </li>
    )
}

export default OrderedItem