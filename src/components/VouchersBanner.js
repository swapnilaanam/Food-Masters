import vouchersAnimation from '@/assets/animation/vouchers.json';
import Lottie from 'lottie-react';
import Link from 'next/link';

const VouchersBanner = () => {
  return (
    <section className="pt-32 pb-28">
      <div className="flex flex-col lg:flex-row overflow-hidden">
        <div className="py-10 lg:flex-1 bg-black lg:-skew-x-12 lg:translate-x-14 lg:relative">
          <div className="w-full h-full bg-black lg:absolute lg:top-0 lg:-left-16 lg:skew-x-12 pb-7 lg:pb-0">
            <div className="lg:ms-20 lg:mt-12 xl:mt-24 text-center lg:text-left">
              <h4 className="w-fit text-xl font-semibold tracking-wider bg-red-600 px-12 py-3 rounded-sm voucher-text">
                Vouchers
              </h4>
              <p className="text-white text-2xl xl:text-4xl font-medium tracking-wider lg:ms-12 xl:mr-20 mt-12 capitalize">
                Get Thousand of discount vouchers from all of your favourite restaurant.
              </p>
              <div className="mt-14 lg:ms-12">
                <Link href="/vouchers" className="bg-green-600 py-4 px-10 font-semibold text-lg text-white rounded-sm capitalize tracking-widest voucher-button">
                  Unlock Vouchers
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="py-10 w-full lg:w-[40%] bg-orange-100 flex justify-center items-center">
          <Lottie animationData={vouchersAnimation} className="lg:ms-16 lg:mt-4 w-[80%] h-[80%]" />
        </div>
      </div>
    </section>
  )
}

export default VouchersBanner