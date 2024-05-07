"use client"

import CartItem from '@/components/CartItem';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { CartContext } from '@/providers/CartProvider';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import './page.css';


const Cart = () => {
    const [subTotal, setSubTotal] = useState(0);
    const [vat, setVat] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [voucherCode, setVoucherCode] = useState(null);

    const { cart, refetch } = useContext(CartContext);

    const [axiosSecure] = useAxiosSecure();

    useEffect(() => {
        setSubTotal(cart?.cartItems?.reduce((total, currentCartItem) => total + (currentCartItem.foodPrice * currentCartItem.quantity), 0));
    }, [cart]);

    useEffect(() => {
        setVat(Math.floor((subTotal / 100) * 3));
    }, [subTotal]);


    const handleVerifyVoucher = async (e) => {
        e.preventDefault();

        const form = e.target;

        const voucherCode = form.vouchercode.value;

        try {
            const response = await axiosSecure.post('/vouchers/verify', { voucherCode: voucherCode, email: cart?.cartItems[0]?.restaurantEmail, subTotal: subTotal });

            if (response.status === 200 && response?.data?.voucherMatched === true) {
                const discountedAmount = Math.round((Number(subTotal) * response?.data?.result?.discountPercentage) / 100);
                setDiscount(discountedAmount);
                setVoucherCode(voucherCode);
                toast.success('Voucher Applied');
            }
        } catch (error) {
            console.log(error?.message);
            const res = JSON.parse(error?.request?.response);

            if (error?.request?.status === 404) {
                toast.error(res?.message, {
                    className: 'toast-position',
                    autoClose: 1500,
                })
            }
            if (error?.request?.status === 410) {
                toast.error('Voucher Expired!')
            }
        }
    }

    return (
        <main>
            <section className="py-20">
                <div className="mx-auto max-w-7xl 2xl:max-w-[1320px] bg-orange-100 px-4 py-10 sm:px-6 sm:py-10 lg:px-7 rounded-sm shadow-lg">
                    <div className="mx-auto max-w-3xl">
                        <header className="text-center">
                            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl mb-10">Your Cart</h1>
                        </header>

                        <div className="mt-8">
                            <ul className="space-y-5">
                                {
                                    cart?.cartItems?.length === 0 && (
                                        <h2 className="text-xl font-medium text-black text-center uppercase py-2">
                                            No food is currently added to the cart!
                                        </h2>
                                    )
                                }
                                {
                                    cart?.cartItems?.map((cartItem) => <CartItem key={cartItem?.foodId} userEmail={cart?.userEmail} cartItem={cartItem} refetch={refetch} />)
                                }
                            </ul>

                            <div className="mt-8 flex flex-col items-end border-t-2 border-white pt-8">
                                <div className="w-full mb-7">
                                    <form onSubmit={handleVerifyVoucher} className="flex justify-end items-center gap-10">
                                        <input
                                            type="text"
                                            name="vouchercode"
                                            placeholder="Enter Your Voucher Code"
                                            className="bg-white p-2 px-4 text-gray-900 rounded focus:outline-orange-200"
                                            disabled={subTotal > 0 ? false : true}
                                        />
                                        <input
                                            type="submit"
                                            value="Apply Voucher"
                                            className="bg-green-600 text-white py-2.5 px-7 rounded cursor-pointer"
                                            disabled={subTotal > 0 ? false : true}
                                        />
                                    </form>
                                </div>
                                <div className="w-screen max-w-lg space-y-4">
                                    <dl className="space-y-2 text-gray-700">
                                        <div className="flex justify-between">
                                            <dt>Subtotal</dt>
                                            <dd>TK. {subTotal}</dd>
                                        </div>

                                        <div className="flex justify-between">
                                            <dt>VAT</dt>
                                            <dd>+ {vat}</dd>
                                        </div>

                                        <div className="flex justify-between">
                                            <dt>Delivery</dt>
                                            {subTotal > 0 ? <dd>+ 20</dd> : <dd>+ 0</dd>}
                                        </div>

                                        <div className="flex justify-between">
                                            <dt>Discount</dt>
                                            {subTotal > 0 ? <dd>- {discount}</dd> : <dd>+ 0</dd>}
                                        </div>

                                        <div className="flex justify-between !text-base font-medium">
                                            <dt>Total</dt>
                                            {subTotal > 0 ? <dd>TK. {subTotal + vat + 20 - discount}</dd> : <dd>TK. 0</dd>}
                                        </div>
                                    </dl>

                                    {
                                        discount > 0 ? (
                                            <div className="flex justify-end">
                                                <span
                                                    className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        className="-ms-1 me-1.5 h-4 w-4"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                                                        />
                                                    </svg>

                                                    <p className="whitespace-nowrap text-xs">1 Voucher Applied</p>
                                                </span>
                                            </div>
                                        ) : (
                                            <p></p>
                                        )
                                    }

                                    <div className="flex justify-end">
                                        <Link
                                            href={{
                                                pathname: `/checkout`,
                                                query: { subtotal: subTotal, vat, voucherCode: voucherCode, discount, total: subTotal + vat + 20 - discount }
                                            }}
                                            aria-disabled={subTotal > 0 ? "false" : "true"}
                                            className={`disabled:bg-green-200 block rounded bg-green-600 px-12 py-2.5 text-white transition hover:bg-green-500 mt-2 ${subTotal <= 0 ? "pointer-events-none" : "pointer-events-auto"}`}
                                        >
                                            Checkout
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main >
    )
}

export default Cart;