import React from 'react'
import { IoIosCloseCircleOutline, IoMdCheckmarkCircleOutline } from 'react-icons/io';

const DeliveryTimeline = ({ orderInfo }) => {

    return (
        <section className="pt-14 pb-5 xl:py-14">
            <h2 className="text-xl font-semibold text-center mb-7">Delivery Timeline</h2>

            {
                orderInfo?.deliveryStatus !== "Cancelled" && (
                    <div className="flex xl:hidden justify-center">
                        <h4 className="w-fit text-xl font-medium text-center bg-green-600 text-white px-12 py-2 rounded-md">
                            {orderInfo?.deliveryStatus}
                        </h4>
                    </div>
                )
            }

            <div className="hidden xl:flex justify-center items-center">
                <div className="flex items-center">
                    {
                        orderInfo?.deliveryStatus !== "Cancelled" && (
                            <div className="flex flex-col items-center">
                                <h4 className="text-xl font-medium text-center text-green-600">Pending</h4>
                                <IoMdCheckmarkCircleOutline className="text-2xl font-medium text-green-600" />
                            </div>
                        )
                    }
                    {
                        orderInfo?.deliveryStatus === "Cancelled" && (
                            <div className="flex flex-col items-center">
                                <h4 className="text-xl font-medium text-center text-red-600">Pending</h4>
                                <IoIosCloseCircleOutline className="text-2xl font-medium text-red-600" />
                            </div>
                        )
                    }
                    {
                        orderInfo?.deliveryStatus === "Pending" && (
                            <div className="bg-orange-300 w-28 h-1.5 rounded mx-4 opacity-60"></div>
                        )
                    }
                    {
                        orderInfo?.deliveryStatus === "In Kitchen" && (
                            <div className="bg-green-600 w-28 h-1.5 rounded mx-4"></div>
                        )
                    }
                    {
                        orderInfo?.deliveryStatus === "In Delivery" && (
                            <div className="bg-green-600 w-28 h-1.5 rounded mx-4"></div>
                        )
                    }
                    {
                        orderInfo?.deliveryStatus === "Delivered" && (
                            <div className="bg-green-600 w-28 h-1.5 rounded mx-4"></div>
                        )
                    }
                    {
                        orderInfo?.deliveryStatus === "Cancelled" && (
                            <div className="bg-red-600 w-28 h-1.5 rounded mx-4"></div>
                        )
                    }
                </div>
                <div className="flex items-center gap-2">
                    {
                        orderInfo?.deliveryStatus === "Pending" && (
                            <>
                                <div className="flex flex-col items-center opacity-60">
                                    <h4 className="text-xl font-medium text-center">In Kitchen</h4>
                                    <IoMdCheckmarkCircleOutline className="text-2xl font-medium text-black" />
                                </div>
                                <div className="bg-orange-300 w-28 h-1.5 rounded mx-4 opacity-60"></div>
                            </>
                        )
                    }
                    {
                        orderInfo?.deliveryStatus === "In Kitchen" && (
                            <>
                                <div className="flex flex-col items-center">
                                    <h4 className="text-xl font-medium text-center text-green-600">In Kitchen</h4>
                                    <IoMdCheckmarkCircleOutline className="text-2xl font-medium text-green-600" />
                                </div>
                                <div className="bg-orange-300 w-28 h-1.5 rounded mx-4 opacity-60"></div>
                            </>
                        )
                    }
                    {
                        orderInfo?.deliveryStatus === "In Delivery" && (
                            <>
                                <div className="flex flex-col items-center">
                                    <h4 className="text-xl font-medium text-center text-green-600">In Kitchen</h4>
                                    <IoMdCheckmarkCircleOutline className="text-2xl font-medium text-green-600" />
                                </div>
                                <div className="bg-green-600 w-28 h-1.5 rounded mx-4"></div>
                            </>
                        )
                    }
                    {
                        orderInfo?.deliveryStatus === "Delivered" && (
                            <>
                                <div className="flex flex-col items-center">
                                    <h4 className="text-xl font-medium text-center text-green-600">In Kitchen</h4>
                                    <IoMdCheckmarkCircleOutline className="text-2xl font-medium text-green-600" />
                                </div>
                                <div className="bg-green-600 w-28 h-1.5 rounded mx-4"></div>
                            </>
                        )
                    }
                    {
                        orderInfo?.deliveryStatus === "Cancelled" && (
                            <>
                                <div className="flex flex-col items-center">
                                    <h4 className="text-xl font-medium text-center text-red-600">In Kitchen</h4>
                                    <IoIosCloseCircleOutline className="text-2xl font-medium text-red-600" />
                                </div>
                                <div className="bg-red-600 w-28 h-1.5 rounded mx-4"></div>
                            </>
                        )
                    }
                </div>
                <div className="flex items-center gap-2">
                    {
                        orderInfo?.deliveryStatus === "Pending" && (
                            <>
                                <div className="flex flex-col items-center opacity-60">
                                    <h4 className="text-xl font-medium text-center">In Delivery</h4>
                                    <IoMdCheckmarkCircleOutline className="text-2xl font-medium text-black" />
                                </div>
                                <div className="bg-orange-300 w-28 h-1.5 rounded mx-4 opacity-60"></div>
                            </>
                        )
                    }
                    {
                        orderInfo?.deliveryStatus === "In Kitchen" && (
                            <>
                                <div className="flex flex-col items-center opacity-60">
                                    <h4 className="text-xl font-medium text-center">In Delivery</h4>
                                    <IoMdCheckmarkCircleOutline className="text-2xl font-medium text-green-600" />
                                </div>
                                <div className="bg-orange-300 w-28 h-1.5 rounded mx-4 opacity-60"></div>
                            </>
                        )
                    }
                    {
                        orderInfo?.deliveryStatus === "In Delivery" && (
                            <>
                                <div className="flex flex-col items-center">
                                    <h4 className="text-xl font-medium text-center text-green-600">In Delivery</h4>
                                    <IoMdCheckmarkCircleOutline className="text-2xl font-medium text-green-600" />
                                </div>
                                <div className="bg-orange-300 w-28 h-1.5 rounded mx-4 opacity-60"></div>
                            </>
                        )
                    }
                    {
                        orderInfo?.deliveryStatus === "Delivered" && (
                            <>
                                <div className="flex flex-col items-center">
                                    <h4 className="text-xl font-medium text-center text-green-600">In Delivery</h4>
                                    <IoMdCheckmarkCircleOutline className="text-2xl font-medium text-green-600" />
                                </div>
                                <div className="bg-green-600 w-28 h-1.5 rounded mx-4"></div>
                            </>
                        )
                    }
                    {
                        orderInfo?.deliveryStatus === "Cancelled" && (
                            <>
                                <div className="flex flex-col items-center">
                                    <h4 className="text-xl font-medium text-center text-red-600">In Delivery</h4>
                                    <IoIosCloseCircleOutline className="text-2xl font-medium text-red-600" />
                                </div>
                                <div className="bg-red-600 w-28 h-1.5 rounded mx-4"></div>
                            </>
                        )
                    }
                </div>
                <div className="flex items-center gap-2">
                    {
                        orderInfo?.deliveryStatus === "Pending" && (
                            <>
                                <div className="flex flex-col items-center opacity-60">
                                    <h4 className="text-xl font-medium text-center">Delivered</h4>
                                    <IoMdCheckmarkCircleOutline className="text-2xl font-medium text-black" />
                                </div>
                                <div className="bg-orange-300 w-28 h-1.5 rounded mx-4 opacity-60"></div>
                            </>
                        )
                    }
                    {
                        orderInfo?.deliveryStatus === "In Kitchen" && (
                            <>
                                <div className="flex flex-col items-center opacity-60">
                                    <h4 className="text-xl font-medium text-center">Delivered</h4>
                                    <IoMdCheckmarkCircleOutline className="text-2xl font-medium text-black" />
                                </div>
                                <div className="bg-orange-300 w-28 h-1.5 rounded mx-4 opacity-60"></div>
                            </>
                        )
                    }
                    {
                        orderInfo?.deliveryStatus === "In Delivery" && (
                            <>
                                <div className="flex flex-col items-center opacity-60">
                                    <h4 className="text-xl font-medium text-center">Delivered</h4>
                                    <IoMdCheckmarkCircleOutline className="text-2xl font-medium text-black" />
                                </div>
                                <div className="bg-orange-300 w-28 h-1.5 rounded mx-4 opacity-60"></div>
                            </>
                        )
                    }
                    {
                        orderInfo?.deliveryStatus === "Delivered" && (
                            <>
                                <div className="flex flex-col items-center">
                                    <h4 className="text-xl font-medium text-center text-green-600">Delivered</h4>
                                    <IoMdCheckmarkCircleOutline className="text-2xl font-medium text-green-600" />
                                </div>
                            </>
                        )
                    }
                    {
                        orderInfo?.deliveryStatus === "Cancelled" && (
                            <>
                                <div className="flex flex-col items-center">
                                    <h4 className="text-xl font-medium text-center text-red-600">Delivered</h4>
                                    <IoIosCloseCircleOutline className="text-2xl font-medium text-red-600" />
                                </div>
                                <div className="bg-red-600 w-28 h-1.5 rounded mx-4"></div>
                            </>
                        )
                    }
                </div>
                <div className="flex items-center gap-2">
                    {
                        (orderInfo?.deliveryStatus !== "Delivered" && orderInfo?.deliveryStatus !== "Cancelled") && (
                            <div className="flex flex-col items-center opacity-60">
                                <h4 className="text-xl font-medium text-center">Cancelled</h4>
                                <IoMdCheckmarkCircleOutline className="text-2xl font-medium text-black" />
                            </div>
                        )
                    }
                    {
                        orderInfo?.deliveryStatus === "Cancelled" && (
                            <div className="flex flex-col items-center">
                                <h4 className="text-xl font-medium text-center text-red-600">Cancelled</h4>
                                <IoIosCloseCircleOutline className="text-2xl font-medium text-red-600" />
                            </div>
                        )
                    }
                </div>
            </div>
        </section>
    )
}

export default DeliveryTimeline