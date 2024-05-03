"use client"

import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link"
import { useState } from "react";

const BusinessNavbar = () => {
    const {user, signOutUser} = useAuth();

    const [isProfileHoverOpen, setIsProfileHoverOpen] = useState(false);

    return (
        <nav className="bg-green-200 w-full px-10 py-7 flex justify-between items-center">
            <h1 className="text-3xl font-semibold text-orange-500 tracking-wider">
                <Link href="/business/dashboard">Food Masters</Link>
            </h1>
            <ul className="flex justify-end items-center gap-10 text-xl font-medium uppercase">
                <li>
                    <Link href="/business/dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link href="/business/menu">Menu</Link>
                </li>
                <li>
                    <Link href="/business/orders">Orders</Link>
                </li>
                {
                    user ? (
                        <li className="cursor-pointer">
                            <div className="w-11 h-11 relative rounded-full border-2 border-orange-400" onClick={() => setIsProfileHoverOpen(!isProfileHoverOpen)}>
                                <Image fill={true} src={user?.photoURL} alt="User" className="object-cover rounded-full" />
                            </div>
                            {
                                isProfileHoverOpen && <div className="z-10 absolute right-3 flex flex-col justify-center items-center bg-white p-7 mt-4 rounded border-2 border-orange-400">
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
                                <Link href="/business/signin" className="px-7 py-2 bg-orange-500 text-white rounded">Login</Link>
                            </li>
                        )
                }
            </ul>
        </nav>
    )
}

export default BusinessNavbar;