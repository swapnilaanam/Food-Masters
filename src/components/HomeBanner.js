'use client';

import Image from 'next/image';
import homeBanner from '@/assets/image/homebanner3.jpg';
import axios from 'axios';
import { useState } from 'react';

const HomeBanner = () => {
  const [searchTimeout, setSearchTimeout] = useState(null);

  const handleRestaurantSearchClick = (e) => {
    e.preventDefault();

    const form = e.target;
    const searchText = form.searchbarhome.value;
    // console.log(searchText);

    handleRestaurantSearch(searchText);
  };

  const handleRestaurantSearch = (searchText) => {

    axios.get(`http://localhost:4000/restaurants?search=${searchText}`)
      .then((response) => {
        if (response?.status === 200) {
          console.log(response?.data);

          const searchList = document.getElementById('searchResult');
          searchList.innerHTML = '';
          
          response?.data?.map((restaurant, index) => {

            const linkItem = document.createElement('a');
            linkItem.href = `/restaurants/${restaurant?._id}`;

            const liItem = document.createElement('li');
            liItem.innerText =  `${restaurant?.restaurantName}, ${restaurant?.city}`;
            
            if(index === response?.data?.length - 1) {
              liItem.className = 'px-4 py-4';
            }
            else {
              liItem.className = 'px-4 py-4 border-b-2 border-orange-400';
            }

            linkItem.appendChild(liItem)
            searchList.appendChild(linkItem);
          });
        }
      })
      .catch((err) => {
        console.log(err?.message);
      });
  };

  const debounce = (searchText, timeout = 700) => {
    if(searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeoutId = setTimeout(() => {
      handleRestaurantSearch(searchText);
    }, timeout);

    setSearchTimeout(timeoutId);
  };

  const handleSearchField = (e) => {
    const searchText = e.target.value;

    debounce(searchText);
  };

  return (
    <section className="w-full h-[630px] home-banner relative">
      <div className="w-full h-full relative">
        <Image src={homeBanner} alt="Home Page Banner" className="w-full h-full object-cover object-top" />
      </div>
      <div className="absolute top-0 w-full h-full flex flex-col justify-center xl:justify-end items-center px-4 xl:px-0 pt-5 md:pt-7 lg:pt-20 xl:pt-0 xl:pb-20">
        <h2 className="text-4xl xl:text-5xl font-semibold text-green-600 mb-5 xl:mb-7">Food Masters</h2>
        <h4 className="xl:text-lg lg:font-medium text-slate-800 mb-7 xl:mb-12 text-center">
          Your Favourite Restaurants Food Delivered To Door Steps
        </h4>
        <form onSubmit={handleRestaurantSearchClick} className="w-full md:w-[50%] lg:w-[40%] xl:w-[30%] flex justify-center items-center relative">
          <input
            type="search"
            name="searchbarhome"
            className="bg-white w-full h-14 rounded-l-full font-medium ps-4 focus:outline-none peer"
            placeholder="Search Restaurant By Name..."
            onChange={handleSearchField}
          />
          <input type="submit" value="Search" className="bg-green-600 text-white text-lg font-medium px-10 h-14 rounded-r-full cursor-pointer" />
          <ul id="searchResult" className="opacity-0 peer-focus:opacity-100 w-full absolute left-0 top-16 bg-green-100 rounded-xl px-4"></ul>
        </form>
      </div>
    </section>
  )
}

export default HomeBanner;