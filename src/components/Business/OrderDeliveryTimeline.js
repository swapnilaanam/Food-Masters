import { IoIosCloseCircleOutline, IoMdCheckmarkCircleOutline } from "react-icons/io"

const OrderDeliveryTimeline = ({ orderInfo }) => {
    return (
        <section className="py-10">
            <div className="flex justify-center items-center">
                <div className="flex items-center">
                    {
                        orderInfo?.deliveryStatus !== "Cancelled" && (
                            <div className="flex flex-col items-center">
                                <h4 className="text-xs font-medium text-center text-green-600">Pending</h4>
                                <IoMdCheckmarkCircleOutline className="text-base font-medium text-green-600" />
                            </div>
                        )
                    }
                    {
                        orderInfo?.deliveryStatus === "Cancelled" && (
                            <div className="flex flex-col items-center">
                                <h4 className="text-xs font-medium text-center text-red-600">Pending</h4>
                                <IoIosCloseCircleOutline className="text-base font-medium text-red-600" />
                            </div>
                        )
                    }
                    {
                        orderInfo?.deliveryStatus === "Pending" && (
                            <div className="bg-orange-300 w-8 h-1 rounded mx-2 opacity-60"></div>
                        )
                    }
                    {
                        orderInfo?.deliveryStatus === "In Kitchen" && (
                            <div className="bg-green-600 w-8 h-1 rounded mx-2"></div>
                        )
                    }
                    {
                        orderInfo?.deliveryStatus === "In Delivery" && (
                            <div className="bg-green-600 w-8 h-1 rounded mx-2"></div>
                        )
                    }
                    {
                        orderInfo?.deliveryStatus === "Delivered" && (
                            <div className="bg-green-600 w-8 h-1 rounded mx-2"></div>
                        )
                    }
                    {
                        orderInfo?.deliveryStatus === "Cancelled" && (
                            <div className="bg-red-600 w-8 h-1 rounded mx-2"></div>
                        )
                    }
                </div>
                <div className="flex items-center gap-[1px]">
                    {
                        orderInfo?.deliveryStatus === "Pending" && (
                            <>
                                <div className="flex flex-col items-center opacity-60">
                                    <h4 className="text-xs font-medium text-center">In Kitchen</h4>
                                    <IoMdCheckmarkCircleOutline className="text-base font-medium text-black" />
                                </div>
                                <div className="bg-orange-300 w-8 h-1 rounded mx-2 opacity-60"></div>
                            </>
                        )
                    }
                    {
                        orderInfo?.deliveryStatus === "In Kitchen" && (
                            <>
                                <div className="flex flex-col items-center">
                                    <h4 className="text-xs font-medium text-center text-green-600">In Kitchen</h4>
                                    <IoMdCheckmarkCircleOutline className="text-base font-medium text-green-600" />
                                </div>
                                <div className="bg-orange-300 w-8 h-1 rounded mx-2 opacity-60"></div>
                            </>
                        )
                    }
                    {
                        orderInfo?.deliveryStatus === "In Delivery" && (
                            <>
                                <div className="flex flex-col items-center">
                                    <h4 className="text-xs font-medium text-center text-green-600">In Kitchen</h4>
                                    <IoMdCheckmarkCircleOutline className="text-base font-medium text-green-600" />
                                </div>
                                <div className="bg-green-600 w-8 h-1 rounded mx-2"></div>
                            </>
                        )
                    }
                    {
                        orderInfo?.deliveryStatus === "Delivered" && (
                            <>
                                <div className="flex flex-col items-center">
                                    <h4 className="text-xs font-medium text-center text-green-600">In Kitchen</h4>
                                    <IoMdCheckmarkCircleOutline className="text-base font-medium text-green-600" />
                                </div>
                                <div className="bg-green-600 w-8 h-1 rounded mx-2"></div>
                            </>
                        )
                    }
                    {
                        orderInfo?.deliveryStatus === "Cancelled" && (
                            <>
                                <div className="flex flex-col items-center">
                                    <h4 className="text-xs font-medium text-center text-red-600">In Kitchen</h4>
                                    <IoIosCloseCircleOutline className="text-base font-medium text-red-600" />
                                </div>
                                <div className="bg-red-600 w-8 h-1 rounded mx-2"></div>
                            </>
                        )
                    }
                </div>
                <div className="flex items-center gap-[1px]">
                    {
                        orderInfo?.deliveryStatus === "Pending" && (
                            <>
                                <div className="flex flex-col items-center opacity-60">
                                    <h4 className="text-xs font-medium text-center">In Delivery</h4>
                                    <IoMdCheckmarkCircleOutline className="text-base font-medium text-black" />
                                </div>
                                <div className="bg-orange-300 w-8 h-1 rounded mx-2 opacity-60"></div>
                            </>
                        )
                    }
                    {
                        orderInfo?.deliveryStatus === "In Kitchen" && (
                            <>
                                <div className="flex flex-col items-center opacity-60">
                                    <h4 className="text-xs font-medium text-center">In Delivery</h4>
                                    <IoMdCheckmarkCircleOutline className="text-base font-medium text-green-600" />
                                </div>
                                <div className="bg-orange-300 w-8 h-1 rounded mx-2 opacity-60"></div>
                            </>
                        )
                    }
                    {
                        orderInfo?.deliveryStatus === "In Delivery" && (
                            <>
                                <div className="flex flex-col items-center">
                                    <h4 className="text-xs font-medium text-center text-green-600">In Delivery</h4>
                                    <IoMdCheckmarkCircleOutline className="text-base font-medium text-green-600" />
                                </div>
                                <div className="bg-orange-300 w-8 h-1 rounded mx-2 opacity-60"></div>
                            </>
                        )
                    }
                    {
                        orderInfo?.deliveryStatus === "Delivered" && (
                            <>
                                <div className="flex flex-col items-center">
                                    <h4 className="text-xs font-medium text-center text-green-600">In Delivery</h4>
                                    <IoMdCheckmarkCircleOutline className="text-base font-medium text-green-600" />
                                </div>
                                <div className="bg-green-600 w-8 h-1 rounded mx-2"></div>
                            </>
                        )
                    }
                    {
                        orderInfo?.deliveryStatus === "Cancelled" && (
                            <>
                                <div className="flex flex-col items-center">
                                    <h4 className="text-xs font-medium text-center text-red-600">In Delivery</h4>
                                    <IoIosCloseCircleOutline className="text-base font-medium text-red-600" />
                                </div>
                                <div className="bg-red-600 w-8 h-1 rounded mx-2"></div>
                            </>
                        )
                    }
                </div>
                <div className="flex items-center gap-[1px]">
                    {
                        orderInfo?.deliveryStatus === "Pending" && (
                            <>
                                <div className="flex flex-col items-center opacity-60">
                                    <h4 className="text-xs font-medium text-center">Delivered</h4>
                                    <IoMdCheckmarkCircleOutline className="text-base font-medium text-black" />
                                </div>
                                <div className="bg-orange-300 w-8 h-1 rounded mx-2 opacity-60"></div>
                            </>
                        )
                    }
                    {
                        orderInfo?.deliveryStatus === "In Kitchen" && (
                            <>
                                <div className="flex flex-col items-center opacity-60">
                                    <h4 className="text-xs font-medium text-center">Delivered</h4>
                                    <IoMdCheckmarkCircleOutline className="text-base font-medium text-black" />
                                </div>
                                <div className="bg-orange-300 w-8 h-1 rounded mx-2 opacity-60"></div>
                            </>
                        )
                    }
                    {
                        orderInfo?.deliveryStatus === "In Delivery" && (
                            <>
                                <div className="flex flex-col items-center opacity-60">
                                    <h4 className="text-xs font-medium text-center">Delivered</h4>
                                    <IoMdCheckmarkCircleOutline className="text-base font-medium text-black" />
                                </div>
                                <div className="bg-orange-300 w-8 h-1 rounded mx-2 opacity-60"></div>
                            </>
                        )
                    }
                    {
                        orderInfo?.deliveryStatus === "Delivered" && (
                            <>
                                <div className="flex flex-col items-center">
                                    <h4 className="text-xs font-medium text-center text-green-600">Delivered</h4>
                                    <IoMdCheckmarkCircleOutline className="text-base font-medium text-green-600" />
                                </div>
                            </>
                        )
                    }
                    {
                        orderInfo?.deliveryStatus === "Cancelled" && (
                            <>
                                <div className="flex flex-col items-center">
                                    <h4 className="text-xs font-medium text-center text-red-600">Delivered</h4>
                                    <IoIosCloseCircleOutline className="text-base font-medium text-red-600" />
                                </div>
                                <div className="bg-red-600 w-8 h-1 rounded mx-2"></div>
                            </>
                        )
                    }
                </div>
                <div className="flex items-center gap-[1px]">
                    {
                        (orderInfo?.deliveryStatus !== "Delivered" && orderInfo?.deliveryStatus !== "Cancelled") && (
                            <div className="flex flex-col items-center opacity-60">
                                <h4 className="text-xs font-medium text-center">Cancelled</h4>
                                <IoMdCheckmarkCircleOutline className="text-base font-medium text-black" />
                            </div>
                        )
                    }
                    {
                        orderInfo?.deliveryStatus === "Cancelled" && (
                            <div className="flex flex-col items-center">
                                <h4 className="text-xs font-medium text-center text-red-600">Cancelled</h4>
                                <IoIosCloseCircleOutline className="text-base font-medium text-red-600" />
                            </div>
                        )
                    }
                </div>
            </div>
        </section>
    )
}

export default OrderDeliveryTimeline