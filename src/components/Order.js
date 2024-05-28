"use client";

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import OrderDeliveryTimeline from './Shared/OrderDeliveryTimeline';
import { toast } from 'react-toastify';
import Rating from 'react-rating';
import { IoIosStar, IoMdStar } from 'react-icons/io';
import { CiFaceFrown, CiFaceMeh } from "react-icons/ci";
import useAxiosSecure from '@/hooks/useAxiosSecure';
import Aos from 'aos';
import 'aos/dist/aos.css';

const Order = ({ order, ordersRefetch }) => {
    const [totalOrderNumber, setTotalOrderNumber] = useState(0);
    const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);
    const [currentRating, setCurrentRating] = useState(0);
    const feedbackTextRef = useRef(null);

    const [axiosSecure] = useAxiosSecure();

    useEffect(() => {
        Aos.init();
    }, []);

    useEffect(() => {
        setTotalOrderNumber(order?.orderedItems?.reduce((total, prev) => total + prev.quantity, 0));
    }, [order]);

    const handleUpdateDeliveryStatus = async (status) => {
        try {
            const response = await axiosSecure.patch(`/orders/${order?._id}`, {
                deliveryStatus: status
            });

            if (response.status === 200 && status !== 'Cancelled') {
                toast.success(`Order is now ${status}`);
                ordersRefetch();
            }

            if (response.status === 200 && status === 'Cancelled') {
                toast.error(`Order is now ${status}`);
                ordersRefetch();
            }
        } catch (error) {
            console.log(error?.message);
        }
    };

    const handleFoodRating = async () => {
        // console.log(feedbackTextRef?.current?.value);
        if (currentRating > 0 && feedbackTextRef?.current?.value) {
            const ratingInfo = {
                orderId: order?._id,
                customerName: order?.customerName,
                customerEmail: order?.customerEmail,
                restaurantName: order?.restaurantName,
                restaurantEmail: order?.restaurantEmail,
                restaurantId: order?.restaurantId,
                totalAmount: order?.total,
                rating: Number(currentRating),
                feedbackText: feedbackTextRef?.current?.value
            };

            try {
                const response = await axiosSecure.post('/ratings', {
                    ratingInfo
                });

                if (response?.status === 201) {
                    const res = await axiosSecure.patch(`/orders/${order._id}`, {
                        isRated: true
                    });

                    if (res.status === 200) {
                        toast.success('We received your rating. Thank You!');
                        setIsRatingDialogOpen(false);
                        ordersRefetch();
                    }
                }

            } catch (error) {
                toast.error(error?.message);
            }
        }
    };

    return (
        <>
            <div
                className="bg-orange-100 rounded md:px-7 drop-shadow-lg"
                data-aos="zoom"
                data-aos-offset="200"
                data-aos-duration="1500">
                <OrderDeliveryTimeline orderInfo={order} />
                <div className="flex justify-center items-center">
                    <div className='w-full space-y-1'>
                        <div className="flex flex-col md:flex-row justify-center items-center w-full md:w-[460px]">
                            <h4 className="text-lg font-medium leading-8 w-full md:w-[40%] text-center md:text-right">
                                Order Number:
                            </h4>
                            <h4 className="md:ms-2 text-base font-normal leading-8 text-center md:text-left w-full md:w-1/2 mt-[1px]">{order?._id}</h4>
                        </div>
                        <div className="flex flex-col md:flex-row justify-center items-center gap-2 w-[460px]">
                            <h4 className="text-lg font-medium leading-8 w-full md:w-[40%] text-center md:text-right">
                                Restaurant Name:
                            </h4>
                            <h4 className="md:ms-2 text-base font-normal leading-8 w-full md:w-1/2 text-center md:text-left mt-[1px]">{order?.restaurantName}</h4>
                        </div>
                        <div className="flex flex-col md:flex-row justify-center items-center gap-2 w-[460px]">
                            <h4 className="text-lg font-medium leading-8 w-full md:w-[40%] text-center md:text-right">
                                Order Quantity:
                            </h4>
                            <h4 className="md:ms-2 text-base font-normal leading-8 rounded-sm w-full md:w-1/2 text-center md:text-left mt-[1px]">
                                <span className="bg-slate-800 text-white px-4 py-0.5 rounded-sm">{totalOrderNumber}</span>
                            </h4>
                        </div>
                        <div className="flex flex-col md:flex-row justify-center items-center gap-2 w-[460px]">
                            <h4 className="text-lg font-medium leading-8 w-full md:w-[40%] text-center md:text-right">
                                Total Amount:
                            </h4>
                            <h4 className="md:ms-2 text-base font-normal leading-8 rounded-sm w-full md:w-1/2 text-center md:text-left mt-[1px]">
                                <span className="bg-green-600 text-white px-3 py-0.5 rounded-sm"> BDT. {order?.total}</span>
                            </h4>
                        </div>
                        <div className="flex flex-col md:flex-row justify-center items-center gap-2 w-[460px]">
                            <h4 className="text-lg font-medium leading-8 w-full md:w-[40%] text-center md:text-right">
                                Delivery Address:
                            </h4>
                            <h4 className="md:ms-2 text-base font-normal leading-8 w-full md:w-1/2 text-center md:text-left mt-[1px]">
                                {order?.customerAddress}, {order?.customerCity}
                            </h4>
                        </div>
                    </div>
                </div>
                <div className="py-7 flex flex-col md:flex-row justify-center items-center gap-5 md:gap-7">
                    <Link href={`/orders/${order?._id}`} className="bg-slate-700 text-sm text-white rounded py-1.5 px-4">
                        View Details
                    </Link>
                    {
                        order?.deliveryStatus === "Pending" && (
                            <button onClick={() => handleUpdateDeliveryStatus("Cancelled")} className="bg-red-600 text-white text-sm rounded py-1.5 px-4">
                                Cancel Order
                            </button>
                        )
                    }
                    {
                        order?.deliveryStatus === "In Delivery" && (
                            <button onClick={() => handleUpdateDeliveryStatus("Delivered")} className="bg-green-600 text-white text-sm rounded py-1.5 px-4">
                                Confirm Order Delivery
                            </button>
                        )
                    }
                    {
                        order?.deliveryStatus === "Delivered" && (
                            <div className="flex justify-center items-center gap-7">
                                {
                                    order?.isRated === false && (
                                        <button onClick={() => setIsRatingDialogOpen(true)} className="bg-green-600 text-white text-sm rounded py-1.5 px-4">
                                            Rate Food
                                        </button>
                                    )
                                }
                            </div>
                        )
                    }
                </div>
            </div>
            {
                isRatingDialogOpen && (
                    <dialog className="max-w-5xl mx-auto px-40 pt-10 pb-24 bg-orange-50 border border-orange-300 rounded flex flex-col items-center justify-center fixed top-1/2 -translate-y-1/2 z-10 shadow-lg">
                        <h4 className="text-xl font-medium mb-10">Rate The Food You Ordered!</h4>
                        <div>
                            {
                                (currentRating === 0.5 || currentRating === 1 || currentRating === 1.5 || currentRating === 2) && (
                                    <div className="flex flex-col items-center gap-2 mb-3">
                                        <CiFaceFrown className="text-2xl font-semibold" />
                                        <h4 className="font-medium text-red-400">Bad Experience</h4>
                                    </div>
                                )
                            }
                            {
                                (currentRating === 2.5 || currentRating === 3 || currentRating === 3.5) && (
                                    <div className="flex flex-col items-center gap-2 mb-3">
                                        <CiFaceMeh className="text-2xl font-semibold" />
                                        <h4 className="font-medium">Average Experience</h4>
                                    </div>
                                )
                            }
                            {
                                (currentRating === 4 || currentRating === 4.5 || currentRating === 5) && (
                                    <div className="flex flex-col items-center gap-2 mb-3">
                                        <CiFaceMeh className="text-2xl font-semibold" />
                                        <h4 className="font-medium text-green-600">Good Experience</h4>
                                    </div>
                                )
                            }
                        </div>
                        <div className="flex flex-col items-center justify-center gap-5">
                            <Rating
                                placeholderRating={currentRating}
                                emptySymbol={<IoIosStar className="icon w-7 h-7 opacity-40" />}
                                placeholderSymbol={<IoMdStar className="icon text-green-500 w-8 h-8" />}
                                fullSymbol={<IoMdStar className="icon text-green-500 w-7 h-7" />}
                                fractions={2}
                                onClick={(rate) => setCurrentRating(rate)}
                            />
                            <textarea name="feedback_text" className="w-full h-20 border border-orange-400 px-4 py-2" placeholder="Give your feedback here..." ref={feedbackTextRef}>
                            </textarea>
                            <button onClick={handleFoodRating} className="text-white bg-green-600 px-5 py-1.5">
                                Rate The Food
                            </button>
                        </div>
                        <div onClick={() => setIsRatingDialogOpen(false)} className="px-2 py-0.5 bg-red-600 text-white rounded absolute top-2 right-3 cursor-pointer">
                            X
                        </div>
                    </dialog>
                )
            }
        </>
    )
}

export default Order