"use client"

import useAuth from "@/hooks/useAuth";
import useMenu from "@/hooks/useMenu";
import { CartContext } from "@/providers/CartProvider";
import Image from "next/image";
import Link from "next/link"
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { LuShoppingBag } from "react-icons/lu";
import { RiMenu5Fill } from "react-icons/ri";


const Navbar = () => {
    const { user, signOutUser } = useAuth();
    const {isMenuOpen, setIsMenuOpen} = useMenu();

    const [isProfileHoverOpen, setIsProfileHoverOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    const pathName = usePathname();

    const { cart } = useContext(CartContext);

    useEffect(() => {
        if (cart?.cartItems) {
            setCartCount(cart?.cartItems?.reduce((total, cartItem) => total + cartItem?.quantity, 0));
        }
    }, [cart]);

    const navLinks = <>
        <li>
            <Link href="/" className={`hover:text-green-600 ${pathName === "/" ? 'text-green-600' : 'text-black'}`}>
                Home
            </Link>
        </li>
        <li>
            <Link href="/restaurants" className={`hover:text-green-600 ${pathName === "/restaurants" ? 'text-green-600' : 'text-black'}`}>
                Restaurants
            </Link>
        </li>
        <li>
            <Link href="/dashboard" className={`hover:text-green-600 ${pathName === "/dashboard" ? 'text-green-600' : 'text-black'}`}>
                Dashboard
            </Link>
        </li>
        <li>
            <Link href="/orders" className={`hover:text-green-600 ${pathName === "/orders" ? 'text-green-600' : 'text-black'}`}>
                Orders
            </Link>
        </li>
        <li className="relative cursor-pointer">
            <Link href="/cart">
                <LuShoppingBag className="text-3xl font-medium" />
                <div className="bg-white text-center rounded-full w-8 h-8 flex justify-center items-center absolute -top-4 left-4">
                    {
                        cartCount
                    }
                </div>
            </Link>
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
                        <Link href="/signin" className="px-10 py-2 bg-green-600 text-white rounded">Login</Link>
                    </li>
                )
        }
    </>

    return (
        <nav className="bg-orange-200 w-full px-7 lg:px-10 py-8 flex flex-col xl:flex-row justify-center xl:justify-between items-center border-b border-gray-100">
            <div className="w-full flex justify-between items-center">
                <h1 className="text-4xl font-semibold text-green-600">
                    <Link href="/">Food Masters</Link>
                </h1>
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="mt-1 xl:hidden flex justify-center items-center">
                    <RiMenu5Fill className="text-4xl" />
                </button>
            </div>
            <ul className="hidden xl:flex justify-end items-center gap-8 text-xl font-medium uppercase">
                {
                    navLinks
                }
            </ul>
            {
                isMenuOpen && (
                    <ul className="mt-10 xl:hidden flex flex-col justify-end items-center gap-8 text-xl font-medium uppercase">
                        {
                            navLinks
                        }
                    </ul>
                )
            }
        </nav>
    )
}

export default Navbar;