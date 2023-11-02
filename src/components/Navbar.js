import Link from "next/link"

const Navbar = () => {
  return (
    <nav className="bg-orange-300 w-full px-20 py-7 flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-green-600">
            <Link href="/">Food Masters</Link>
        </h1>
        <ul className="flex justify-end items-center gap-10 text-xl font-medium uppercase">
            <li>
                <Link href="/">Home</Link>
            </li>
            <li>
                <Link href="/">Restaurants</Link>
            </li>
            <li>
                <Link href="/">About</Link>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar