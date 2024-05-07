"use client";

import reviewAnimation from '@/assets/animation/reviewAnimation.json';
import Lottie from 'lottie-react';

import { Swiper, SwiperSlide } from 'swiper/react';

import { EffectCreative, Navigation } from 'swiper/modules';

import Rating from 'react-rating';

import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/navigation';

import { TiChevronLeftOutline, TiChevronRightOutline } from "react-icons/ti";
import { TbChevronsDownRight, TbChevronsUpLeft } from "react-icons/tb";
import { FaQuoteLeft, FaQuoteRight, FaRegStar, FaStar } from 'react-icons/fa';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const CustomerReview = () => {
  const [swiperInstance, setSwiperInstance] = useState(null);

  const { data: feedbacks = [] } = useQuery({
    queryKey: ['feedbacks'],
    queryFn: async () => {
      try {
        const response = await axios.get('http://localhost:4000/ratings');

        if (response?.status === 200) {
          return response?.data?.slice(0, 5);
        }
      } catch (error) {
        console.log(error?.message);
      }
    }
  });


  const handlePrevSlide = () => {
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  }

  const handleNextSlide = () => {
    if (swiperInstance) {
      swiperInstance.slideNext();
    }
  }

  return (
    <section className="pt-16 pb-28">
      <h2 className="text-center text-4xl font-medium tracking-wide mb-20">Foodies Reviews</h2>
      <div className="max-w-7xl mx-auto flex justify-center items-center gap-14">
        <div className="w-[50%] h-full flex flex-col justify-center items-center">
          {
            feedbacks?.length === 0 ? (
              <h2 className="text-center text-xl font-medium">
                Feedbacks Are Not Available Right Now...
              </h2>
            ) : (
              <>
                <div className="w-full flex justify-end gap-5 mb-7">
                  <button onClick={handlePrevSlide} className="bg-green-600 text-white px-4 py-4 rounded-full text-2xl font-medium">
                    <TiChevronLeftOutline className="animate-pulse" />
                  </button>
                  <button onClick={handleNextSlide} className="bg-green-600 text-white px-4 py-4 rounded-full text-2xl font-medium" >
                    <TiChevronRightOutline className="animate-pulse" />
                  </button>
                </div>
                <Swiper
                  onSwiper={(swiper) => setSwiperInstance(swiper)}
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
                  {
                    feedbacks?.map((feedback) => {
                      return (
                        (
                          <SwiperSlide className="bg-orange-200 rounded" key={feedback?._id}>
                            <div className="w-full h-full flex flex-col justify-center items-center py-10">
                              <div className="pb-2">
                                <Rating
                                  placeholderRating={feedback?.rating}
                                  emptySymbol={<FaRegStar className="icon text-black w-8 h-8" />}
                                  placeholderSymbol={<FaStar className="icon text-green-600 w-8 h-8" />}
                                  fullSymbol={<FaStar className="icon text-green-600 w-8 h-8" />}
                                  readonly
                                />
                              </div>
                              <div className="w-full justify-left ps-7 py-2">
                                <FaQuoteLeft className="w-8 h-8 text-green-600 my-3" />
                              </div>
                              <p className="text-black px-14 text-sm font-normal text-justify leading-relaxed">
                                {
                                  feedback?.feedbackText
                                }
                              </p>
                              <div className="w-full flex justify-end pr-7 py-2">
                                <FaQuoteRight className="w-8 h-8 text-green-600 my-3" />
                              </div>
                              <div className="flex flex-col justify-center">
                                <div className="flex justify-start">
                                  <TbChevronsUpLeft className="font-semibold text-4xl text-green-600 -translate-x-7 animate-pulse" />
                                </div>
                                <h6 className="text-black font-medium tracking-wider">
                                  {feedback?.customerName}
                                </h6>
                                <div className="flex justify-end">
                                  <TbChevronsDownRight className="font-semibold text-4xl text-green-600 translate-x-7 animate-pulse" />
                                </div>
                              </div>
                            </div>
                          </SwiperSlide>
                        )
                      )
                    })
                  }
                </Swiper>
              </>
            )
          }
        </div>
        <div className="w-[40%] h-full flex justify-end items-center">
          <Lottie animationData={reviewAnimation} className="w-[90%] h-[90%]" />
        </div>
      </div>
    </section>
  )
}

export default CustomerReview;