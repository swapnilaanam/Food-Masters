"use client"

import { CartContext } from "@/providers/CartProvider";
import Link from "next/link"
import { useContext } from "react";
import { LuShoppingBag } from "react-icons/lu";


const Navbar = () => {
    const { cart } = useContext(CartContext);

    return (
        <nav className="bg-orange-200 w-full px-20 py-7 flex justify-between items-center">
            <h1 className="text-3xl font-semibold text-green-600">
                <Link href="/">Food Masters</Link>
            </h1>
            <ul className="flex justify-end items-center gap-10 text-xl font-medium uppercase">
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/restaurants">Restaurants</Link>
                </li>
                <li className="relative cursor-pointer">
                    <Link href="/cart">
                        <LuShoppingBag className="text-3xl font-medium" />
                        <div className="bg-white text-center rounded-full w-10 h-10 flex justify-center items-center absolute -top-5 left-4">
                            {
                                !cart ?
                                    0
                                    :
                                    cart?.cartItems?.reduce((prevValue, currentValue) => prevValue + currentValue.quantity, 0)
                            }
                        </div>
                    </Link>
                </li>
                <li>
                    <Link href="/">About</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar