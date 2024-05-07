import Marquee from "react-fast-marquee"
import sslcommerzLogo from '@/assets/logo/sslcommerz.png';
import visaLogo from '@/assets/logo/visa.png';
import mastercardLogo from '@/assets/logo/mastercard.png';
import bkashLogo from '@/assets/logo/Bkash.png';
import nagadLogo from '@/assets/logo/Nagad.png';
import upayLogo from '@/assets/logo/upay.png';
import Image from "next/image";

const PaymentPartners = () => {
  return (
    <section className="pt-16 pb-28">
      <h2 className="text-center text-4xl font-medium mb-20">Payment Partners</h2>
      <div className="max-w-7xl mx-auto flex justify-center items-center">
        <Marquee speed={80}>
          <div className="mx-14 w-28 h-28 relative">
            <Image fill={true} src={sslcommerzLogo} alt="SSLCOMMERZ Logo" className="w-full h-full object-contain" />
          </div>
          <div className="mx-14 w-28 h-28 relative">
            <Image fill={true} src={visaLogo} alt="Visa Logo" className="w-full h-full object-contain" />
          </div>
          <div className="mx-14 w-28 h-28 relative">
            <Image fill={true} src={mastercardLogo} alt="Mastercard Logo" className="w-full h-full object-contain" />
          </div>
          <div className="mx-14 w-28 h-28 relative">
            <Image fill={true} src={bkashLogo} alt="Bkash Logo" className="w-full h-full object-contain" />
          </div>
          <div className="mx-14 w-28 h-28 relative">
            <Image fill={true} src={nagadLogo} alt="Nagad Logo" className="w-full h-full object-contain" />
          </div>
          <div className="mx-14 w-28 h-28 relative">
            <Image fill={true} src={upayLogo} alt="Upay Logo" className="w-full h-full object-contain" />
          </div>
        </Marquee>
      </div>
    </section>
  )
}

export default PaymentPartners