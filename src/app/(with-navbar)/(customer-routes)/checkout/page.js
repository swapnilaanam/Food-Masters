"use client";

import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useMenu from "@/hooks/useMenu";
import { CartContext } from "@/providers/CartProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { useContext, useEffect } from "react";

const CheckOut = () => {
  const params = useSearchParams();

  const subTotal = params.get("subtotal");
  const vat = params.get("vat");
  const voucherCode = params.get("voucherCode");
  const discount = params.get("discount");
  const total = params.get("total");

  const { user } = useAuth();
  const {setIsMenuOpen} = useMenu();
  const { cart } = useContext(CartContext);

  const [axiosSecure] = useAxiosSecure();

  // console.log(cart);

  const { data: customerInfo = {} } = useQuery({
    queryKey: ["customerInfo", user?.email],
    queryFn: async (req, res) => {
      try {
        if (user) {
          const response = await axios.get(`https://food-masters-server.vercel.app/users/${user?.email}`);
          return response?.data;
        }
      } catch (error) {
        console.log(error?.message);
      }
    }
  });

  useEffect(() => {
    setIsMenuOpen(false);
  }, [setIsMenuOpen]);

  const handlePlaceTheOrder = async () => {
    const singleCartItem = cart?.cartItems[0];

    const orderInfo = {
      customerName: customerInfo?.name,
      customerEmail: customerInfo?.email,
      customerAddress: customerInfo?.address,
      customerCity: customerInfo?.city,
      customerPhoneNumber: customerInfo?.phoneNumber,
      restaurantId: singleCartItem?.restaurantId,
      restaurantName: singleCartItem?.restaurantName,
      restaurantEmail: singleCartItem?.restaurantEmail, 
      orderedItems: cart?.cartItems,
      total: Number(total)
    };

    try {
      const response = await axiosSecure.post('/orders', orderInfo);
      // console.log(response?.data?.url);
      if(response.status === 200) {
        window.location.replace(response?.data.url);
      }
    } catch (error) {
      console.log(error?.message);
    }
  }


  return (
    <main>
      <section className="py-20 px-4 2xl:px-0">
        <div className="mx-auto max-w-7xl bg-orange-100 px-4 py-10 sm:px-6 sm:py-10 lg:px-7 rounded-sm shadow-lg">
          <div className="xl:px-24">
            <header className="text-center">
              <h1 className="text-xl font-bold text-gray-900 sm:text-3xl mb-10">Checkout</h1>
            </header>

            <div className="mt-8 flex flex-col lg:flex-row justify-normal lg:justify-center items-center lg:items-stretch">
              <ul className="space-y-5 border-b-2 lg:border-b-0 lg:border-r-2 border-gray-400 lg:flex-1 pb-12 lg:pb-0">
                {
                  cart?.cartItems?.map((cartItem) => {
                    return (
                      <li key={cartItem?.foodId} className="flex items-center gap-10">
                        <div className="w-16 h-16 relative">
                          <Image
                            fill={true}
                            src={cartItem?.foodImage}
                            alt="Food"
                            className="h-16 w-16 rounded object-cover"
                          />
                        </div>

                        <div>
                          <h3 className="text-lg text-gray-900">{cartItem?.foodName}</h3>

                          <dl className="mt-1 space-y-px text-sm text-gray-600">
                            <div>
                              <dt className="inline">Food Category: </dt>
                              <dd className="inline">{cartItem?.foodCategory}</dd>
                            </div>

                            <div>
                              <dt className="inline">Price: </dt>
                              <dd className="inline">{cartItem?.foodPrice} Tk.</dd>
                            </div>
                          </dl>
                        </div>

                        <div className="flex flex-1 items-center justify-end gap-2 lg:pr-14">
                          <form>
                            <label htmlFor="Line1Qty" className="sr-only"> Quantity </label>

                            <div className="flex justify-center items-center gap-3">
                              <input
                                type="number"
                                min="1"
                                value={cartItem?.quantity}
                                id="Line1Qty"
                                className="h-8 w-12 rounded border-gray-100 bg-white p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                                disabled
                              />
                            </div>
                          </form>
                        </div>
                      </li>
                    )
                  })
                }
              </ul>
              <div className="pt-12 lg:pt-0 flex-1 flex justify-center items-start">
                <div className="flex flex-col justify-start items-end lg:flex-1 gap-[32px]">
                  <h2 className="text-xs md:text-lg font-medium mt-1 md:mt-0">Customer Name: </h2>
                  <h3 className="text-xs md:text-lg font-medium mt-1 md:mt-0 lg:mt-0.5 xl:mt-0">Email: </h3>
                  <h4 className="text-xs md:text-lg font-medium mt-1 md:mt-0">Address: </h4>
                </div>
                <div className="flex flex-col justify-start gap-7">
                  <span className="ms-4 text-xs md:text-base font-normal bg-white px-4 py-1 rounded">{customerInfo?.name}</span>
                  <span className="ms-4 text-xs md:text-base font-normal bg-white px-4 py-1 rounded">{customerInfo?.email}</span>
                  <span className="ms-4 text-xs md:text-base font-normal bg-white px-4 py-1 rounded">{customerInfo?.address}, {customerInfo?.city}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-end border-t-2 border-white pt-8">
              <div className="w-full md:w-screen max-w-lg space-y-4">
                <dl className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <dt>Subtotal</dt>
                    <dd>TK. {Number(subTotal)}</dd>
                  </div>

                  <div className="flex justify-between">
                    <dt>VAT</dt>
                    <dd>+ {Number(vat)}</dd>
                  </div>

                  <div className="flex justify-between">
                    <dt>Delivery</dt>
                    <dd>+ 20</dd>
                  </div>

                  <div className="flex justify-between">
                    <dt>Discount</dt>
                    <dd>- {Number(discount)}</dd>
                  </div>

                  <div className="flex justify-between !text-base font-medium">
                    <dt>Total</dt>
                    <dd>TK. {Number(total)}</dd>
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

                        <p className="whitespace-nowrap text-xs">{voucherCode} Voucher Applied</p>
                      </span>
                    </div>
                  ) : (
                    <p></p>
                  )
                }

                <div className="flex justify-end">
                  <button
                    onClick={handlePlaceTheOrder}
                    className="block rounded bg-green-600 px-12 py-2.5 text-white transition hover:bg-green-500 disabled:bg-green-50 mt-2"
                    disabled={total > 0 ? false : true}
                  >
                    Place The Order
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}

export default CheckOut;