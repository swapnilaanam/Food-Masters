import Features from "@/components/Features";
import FoodCategories from "@/components/FoodCategories";
import HomeBanner from "@/components/HomeBanner";


export default function Home() {
  return (
    <main>
      <HomeBanner />
      <FoodCategories />
      <Features />
    </main>
  )
}
