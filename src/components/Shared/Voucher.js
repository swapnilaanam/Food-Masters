'use client';

import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const Voucher = ({ voucher, isRestaurantNameShown, isCopyCodeShown }) => {
    const [expiryDate, setExpiryDate] = useState(null);

    const voucherCodeRef = useRef();

    useEffect(() => {
        const monthShortForms = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const date = new Date(voucher?.voucherExpiry);
        const day = date.getDate();
        const month = monthShortForms[date.getMonth()];
        const year = date.getFullYear();

        const formattedDate = `${month} ${day}, ${year}`;
        setExpiryDate(formattedDate);
    }, [voucher]);

    const copyText = async () => {
        const text = voucherCodeRef?.current?.innerHTML;
        try {
            await navigator.clipboard.writeText(text);
            toast.success('Voucher Code Copied!');
        } catch (error) {
            toast.error(error?.message);
        }
    };


    return (
        <div className="bg-orange-300 w-[500px] h-64 relative flex flex-col justify-center items-center gap-4 rounded-sm overflow-hidden">
            <div className="bg-white w-20 h-20 rounded-full absolute top-[93px] -left-8"></div>
            <div className="bg-white w-20 h-20 rounded-full absolute top-[93px] -right-8"></div>
            <h4 className="bg-green-600 text-white text-sm px-5 py-2.5 font-medium rounded-tl-sm absolute top-0 left-0">
                {voucher?.discountPercentage}% Discount
            </h4>
            <h4 className="bg-orange-600 text-white text-sm px-5 py-2.5 font-medium rounded-tr-sm absolute top-0 right-0">
                Min. Order: Tk. {voucher?.minimumAmount}
            </h4>
            <h4 className="bg-white px-7 py-2.5 font-medium rounded-sm mt-4" ref={voucherCodeRef}>
                {voucher?.voucherCode}
            </h4>
            {
                isCopyCodeShown && (
                    <button onClick={copyText} className="bg-green-600 text-white text-sm font-medium rounded-sm px-5 py-2">
                        Copy Code
                    </button>
                )
            }
            <div className=" mt-2 flex justify-center gap-3">
                {
                    isRestaurantNameShown && (
                        <h4 className="bg-white text-sm font-medium rounded-sm px-5 py-2">
                            {voucher?.restaurantName}
                        </h4>
                    )
                }
                <h4 className="bg-white text-sm font-medium rounded-sm px-5 py-2">
                    {expiryDate}
                </h4>
            </div>
        </div>
    )
}

export default Voucher;