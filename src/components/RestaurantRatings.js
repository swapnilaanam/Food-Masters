'use client';

import Rating from "react-rating";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const RestaurantRatings = ({restaurantId}) => {
  const [resRating, setResRating] = useState(0);

  const {data: ratings = []} = useQuery({
    queryKey: ['ratings'],
    queryFn: async() => {
      try {
        const response = await axios.get(`http://localhost:5000/ratings/${restaurantId}`);

        if(response?.status === 200) {
          setResRating(Number(response?.data?.reduce((total, rating) => total + rating?.rating, 0) / response?.data?.length));
          return response?.data;
        }
      } catch (error) {
        console.log(error?.message);
      }
    }
  });

  return (
    <section>
      <div>
        <h2 className="text-xl font-medium mb-4">Restaurant Rating</h2>
        <div className="ms-4 flex justify-start items-center">
          <Rating
            initialRating={resRating}
            emptySymbol={<FaRegStar className="text-3xl font-semibold text-green-600" />}
            fullSymbol={<FaStar className="text-3xl font-semibold text-green-600" />}
            readonly
          />
          <span className="ms-4 text-lg font-medium">({resRating})</span>
        </div>
        <h4 className="font-medium mt-4">Total Customer Reviewed - {ratings?.length}</h4>
      </div>
    </section>
  )
}

export default RestaurantRatings;