"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { FcApproval } from "react-icons/fc";

const PaymentSuccess = () => {
  const { tranId } = useParams();

  return (
    <main>
      <section className="py-28">
        <div className="max-w-7xl mx-auto flex flex-col justify-center items-center">
          <FcApproval className="text-7xl mb-5" />
          <h4 className="text-4xl font-medium">Payment Successful!</h4>

          <div className="mt-12 flex flex-col justify-center items-center gap-10">
            <button>
              <Link href={`/orders/${tranId}`} className="bg-orange-300 px-10 py-2 rounded">Track Your Order</Link>
            </button>
            <button>
              <Link href={`/`} className="bg-green-600 text-white px-10 py-2 rounded">Go Back To Home</Link>
            </button>
          </div>
        </div>
      </section>
    </main>
  )
};

export default PaymentSuccess;