import Link from 'next/link'
import React from 'react'
import { FcCancel } from 'react-icons/fc'

const PaymentCancel = () => {
    return (
        <main>
            <section className="py-28">
                <div className="max-w-7xl mx-auto flex flex-col justify-center items-center">
                    <FcCancel className="text-7xl mb-5" />
                    <h4 className="text-4xl font-medium">Payment Cancelled!</h4>
                    <div className="mt-12 flex flex-col justify-center items-center gap-10">
                        <button>
                            <Link href={`/`} className="bg-green-600 text-white px-10 py-2 rounded">Go Back To Home</Link>
                        </button>
                    </div>
                </div>
            </section>
        </main>


    )
}

export default PaymentCancel;