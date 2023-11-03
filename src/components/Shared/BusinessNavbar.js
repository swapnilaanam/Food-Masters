import Link from "next/link"

const BusinessNavbar = () => {
  return (
    <nav className="bg-green-200 w-full px-20 py-7 flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-orange-500 tracking-wider">
            <Link href="/">Food Masters</Link>
        </h1>
        <ul className="flex justify-end items-center gap-10 text-xl font-medium uppercase">
            <li>
                <Link href="/business/dashboard">Dashboard</Link>
            </li>
            <li>
                <Link href="/">Menu</Link>
            </li>
            <li>
                <Link href="/">Orders</Link>
            </li>
        </ul>
    </nav>
  )
}

export default BusinessNavbar;