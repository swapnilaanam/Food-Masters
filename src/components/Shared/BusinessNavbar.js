"use client"

import useAuth from "@/hooks/useAuth";
import useBusinessMenu from "@/hooks/useBusinessMenu";
import Image from "next/image";
import Link from "next/link"
import { usePathname } from "next/navigation";
import { useState } from "react";
import { RiMenu5Fill } from "react-icons/ri";

const BusinessNavbar = () => {
    const { user, signOutUser } = useAuth();

    const { isBusinessMenuOpen, setIsBusinessMenuOpen } = useBusinessMenu();

    const [isProfileHoverOpen, setIsProfileHoverOpen] = useState(false);

    const pathName = usePathname();

    const navLinks = <>
        <li>
            <Link href="/business/dashboard" className={pathName === '/business/dashboard' ? 'text-green-600 font-semibold' : 'text-black font-medium'}>
                Dashboard
            </Link>
        </li>
        <li>
            <Link href="/business/menu" className={pathName === '/business/menu' ? 'text-green-600 font-semibold' : 'text-black font-medium'}>
                Menu
            </Link>
        </li>
        <li>
            <Link href="/business/vouchers" className={pathName === '/business/vouchers' ? 'text-green-600 font-semibold' : 'text-black font-medium'}>
                Vouchers
            </Link>
        </li>
        <li>
            <Link href="/business/orders" className={pathName === '/business/orders' ? 'text-green-600 font-semibold' : 'text-black font-medium'}>
                Orders
            </Link>
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
    </>

    return (
        <nav className="bg-orange-200 w-full px-7 lg:px-10 py-8 flex flex-col xl:flex-row justify-center xl:justify-between items-center border-b border-gray-100">
            <div className="w-full flex justify-between items-center">
                <h1 className="text-4xl font-semibold text-green-600">
                    <Link href="/business/dashboard">Food Masters</Link>
                </h1>
                <button onClick={() => setIsBusinessMenuOpen(!isBusinessMenuOpen)} className="mt-1 xl:hidden flex justify-center items-center">
                    <RiMenu5Fill className="text-4xl" />
                </button>
            </div>
            <ul className="hidden xl:flex justify-end items-center gap-8 text-xl font-medium uppercase">
                {
                    navLinks
                }
            </ul>
            {
                isBusinessMenuOpen && (
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

export default BusinessNavbar;