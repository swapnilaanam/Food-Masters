"use client";

import reviewAnimation from '@/assets/animation/reviewAnimation.json';
import Lottie from 'lottie-react';

import { Swiper, SwiperSlide } from 'swiper/react';

import { EffectCreative, Navigation } from 'swiper/modules';

import Rating from 'react-rating';

import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/navigation';

import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { IoIosStar, IoMdStar } from "react-icons/io";
import { GrBlockQuote } from "react-icons/gr";

const CustomerReview = () => {
  let mySwiper;

  return (
    <section className="py-28">
      <div className="max-w-7xl 2xl:max-w-[1320px] mx-auto h-[550px] flex justify-between items-center">
        <div className="w-[40%] h-full flex flex-col justify-center items-center">
          <h2 className="text-3xl font-medium mb-14">Customer Review</h2>
          <Swiper
            onSwiper={(swiper) => (mySwiper = swiper)}
            grabCursor={true}
            effect={'creative'}
            navigation={true}
            creativeEffect={{
              prev: {
                shadow: true,
                translate: [0, 0, -400],
              },
              next: {
                translate: ['100%', 0, 0],
              },
            }}
            modules={[EffectCreative, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide className="bg-orange-200 rounded">
              <div className="w-full h-full flex flex-col justify-center items-center py-7">
                <Rating
                  placeholderRating={3.5}
                  emptySymbol={<IoIosStar className="icon text-white w-8 h-8" />}
                  placeholderSymbol={<IoMdStar className="icon text-green-500 w-8 h-8" />}
                  fullSymbol={<IoMdStar className="icon text-green-500 w-8 h-8" />}
                  readonly
                />
                <GrBlockQuote className="w-8 h-8 text-black my-3" />
                <p className="text-black px-10 text-base font-normal text-center">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam eius veritatis enim dignissimos. Architecto corrupti incidunt libero, id provident nostrum ducimus, minima pariatur officiis optio enim quis ipsam, modi eius?
                </p>
                <GrBlockQuote className="w-8 h-8 text-black my-3" />
                <h6 className="text-black font-normal">---- <span>John Doe</span></h6>
              </div>
            </SwiperSlide>
          </Swiper>

          <div className="flex justify-start gap-5 ms-2 mt-5">
            <button onClick={() => mySwiper.slidePrev()} className="bg-orange-300 px-4 py-4 rounded-full text-2xl font-medium">
              <MdKeyboardDoubleArrowLeft />
            </button>
            <button onClick={() => mySwiper.slideNext()} className="bg-orange-300 px-4 py-4 rounded-full text-2xl font-medium" >
              <MdKeyboardDoubleArrowRight />
            </button>
          </div>
        </div>

        <div className="w-[60%] h-full flex justify-end items-center">
          <Lottie animationData={reviewAnimation} className="w-full h-full" />
        </div>
      </div>
    </section>
  )
}

export default CustomerReview