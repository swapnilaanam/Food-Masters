import Image from 'next/image';
import homeBanner from '@/assets/image/homebanner3.jpg';

const HomeBanner = () => {
  return (
    <section className="w-full h-[630px] home-banner relative">
      <Image src={homeBanner} alt="Home Page Banner" className="w-full h-full object-cover object-top" />
      <div className="absolute top-0 w-full h-full flex flex-col justify-end items-center pb-20">
        <h2 className="text-5xl font-semibold text-green-600 mb-7">Food Masters</h2>
        <h4 className="text-lg font-medium text-slate-800 mb-12 text-center">Your Favourite Restaurants Food Delivered To Door Steps</h4>
        <form className="w-[30%] flex justify-center items-center">
          <input
            type="search"
            name="searchbarhome"
            className="bg-white w-full h-14 rounded-l-full font-medium ps-4 focus:outline-none"
            placeholder="Search Restaurant By Name..."
          />
          <input type="submit" value="Search" className="bg-green-600 text-white text-lg font-medium px-10 h-14 rounded-r-full cursor-pointer" />
        </form>
      </div>
    </section>
  )
}

export default HomeBanner;