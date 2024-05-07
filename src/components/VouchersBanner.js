import vouchersAnimation from '@/assets/animation/vouchers.json';
import Lottie from 'lottie-react';
import Link from 'next/link';

const VouchersBanner = () => {
  return (
    <section className="py-28">
      <div className="flex overflow-hidden">
        <div className="py-10 flex-1 bg-black -skew-x-12 translate-x-14 relative">
          <div className="w-full h-full bg-black absolute top-0 -left-16 skew-x-12">
            <div className="ms-20 mt-24">
              <h4 className="w-fit text-xl font-semibold tracking-wider bg-red-600 px-12 py-3 rounded-sm voucher-text">Vouchers</h4>
              <p className="text-white text-4xl font-medium tracking-wider ms-12 mr-20 mt-12 capitalize">
                Get Thousand of discount vouchers from all of your favourite restaurant.
              </p>
              <div className="mt-14 ms-12">
                <Link href="/vouchers" className="bg-green-600 py-4 px-10 font-semibold text-lg text-white rounded-sm capitalize tracking-widest voucher-button">
                  Unlock Vouchers
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="py-10 w-[40%] bg-orange-100 flex justify-center items-center">
          <Lottie animationData={vouchersAnimation} className="ms-16 mt-4 w-[80%] h-[80%]" />
        </div>
      </div>
    </section>
  )
}

export default VouchersBanner