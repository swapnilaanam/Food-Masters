import Link from "next/link"
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { FaLocationDot, FaPhoneFlip, FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
    return (
        <footer className="px-4 lg:px-0 mt-28 w-full bg-orange-100">
            <div className="py-20 flex flex-col xl:flex-row justify-center items-center gap-20">
                <section className="flex-1 flex flex-col items-center">
                    <h4 className="text-2xl font-semibold tracking-wide mb-10">
                        Get In Touch With Us
                    </h4>
                    <ul className="flex justify-center items-center gap-7">
                        <li className="bg-white border-2 border-orange-200 p-4 rounded-full hover:bg-green-600 hover:text-white hover:border-green-600 hover:cursor-pointer duration-1000">
                            <Link href="https://www.facebook.com" target="_blank">
                                <FaFacebook className="text-xl" />
                            </Link>
                        </li>
                        <li className="bg-white border-2 border-orange-200 p-4 rounded-full hover:bg-green-600 hover:text-white hover:border-green-600 hover:cursor-pointer duration-1000">
                            <Link href="https://www.instagram.com" target="_blank">
                                <FaInstagram className="text-xl" />
                            </Link>
                        </li>
                        <li className="bg-white border-2 border-orange-200 p-4 rounded-full hover:bg-green-600 hover:text-white hover:border-green-600 hover:cursor-pointer duration-1000">
                            <Link href="https://www.x.com" target="_blank">
                                <FaXTwitter className="text-xl" />
                            </Link>
                        </li>
                        <li className="bg-white border-2 border-orange-200 p-4 rounded-full hover:bg-green-600 hover:text-white hover:border-green-600 hover:cursor-pointer duration-1000">
                            <Link href="https://web.whatsapp.com" target="_blank">
                                <FaWhatsapp className="text-xl" />
                            </Link>
                        </li>
                    </ul>
                </section>
                <section className="flex-2 flex flex-col items-center">
                    <h2 className="text-green-600 text-4xl font-semibold mb-5">
                        Food Masters
                    </h2>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-7 text-lg">
                        <Link href="/" className="hover:text-green-600 duration-200">Home</Link>
                        <Link href="/restaurants"  className="hover:text-green-600 duration-200">Restaurants</Link>
                        <Link href="/orders" className="hover:text-green-600 duration-200">Orders</Link>
                        <Link href="/business/dashboard"  className="hover:text-green-600 duration-200">Food Master For Business</Link>
                    </div>
                </section>
                <section className="flex-1 flex-col items-center">
                    <h4 className="text-2xl text-center font-semibold tracking-wide mb-7">
                        Our Location
                    </h4>
                    <div className="space-y-2">
                        <div>
                            <div className="flex justify-center items-center text-base gap-2">
                                <FaLocationDot />
                                <h6>26,/2, Akram Tower, Zindabazar, Sylhet.</h6>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-center items-center text-base gap-2">
                                <MdEmail />
                                <h6>support@foodmasters.com</h6>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-center items-center text-base gap-2">
                                <FaPhoneFlip />
                                <h6>+8801666556541</h6>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <h4 className="pb-7 text-center text-xl font-medium">
                &copy; 2024 | Designed & Developed By
                <Link href="https://www.swapnilaanam.com" target="_blank" className="text-green-600 ms-2">
                    Swapnil Aanam.
                </Link>
            </h4>
        </footer>
    )
}

export default Footer