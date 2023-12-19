"use client"

import useAuth from "@/app/hooks/useAuth";
import { CartContext } from "@/providers/CartProvider";
import Image from "next/image";
import Link from "next/link"
import { useContext, useState } from "react";
import { LuShoppingBag } from "react-icons/lu";


const Navbar = () => {
    const { user, signOutUser } = useAuth();
    const { cart } = useContext(CartContext);

    const [isProfileHoverOpen, setIsProfileHoverOpen] = useState(false);

    return (
        <nav className="bg-orange-200 w-full px-10 py-7 flex justify-between items-center">
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
                    <Link href="/">Orders</Link>
                </li>
                <li>
                    <Link href="/">Dashboard</Link>
                </li>
                {
                    user ? (
                        <li className="cursor-pointer">
                            <div className="w-11 h-11 relative rounded-full border-2 border-green-300" onClick={() => setIsProfileHoverOpen(!isProfileHoverOpen)}>
                                <Image fill={true} src={user?.photoURL} alt="User" className="object-cover rounded-full" />
                            </div>
                            {
                                isProfileHoverOpen && <div className="z-10 absolute right-3 flex flex-col justify-center items-center bg-white p-5 mt-4 rounded">
                                    <h4 className="text-sm">{user?.displayName}</h4>
                                    <button
                                        className="text-sm bg-red-600 text-white px-6 py-2 rounded mt-4"
                                        onClick={() => signOutUser()}>
                                        Logout
                                    </button>
                                </div>
                            }
                        </li>
                    )
                        : (
                            <li>
                                <Link href="/signin" className="px-7 py-2 bg-green-400 text-white rounded">Login</Link>
                            </li>
                        )
                }
            </ul>
        </nav>
    )
}

export default Navbar;