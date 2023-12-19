import { FcCandleSticks, FcMoneyTransfer, FcPaid } from "react-icons/fc"
import { IoFastFoodOutline } from "react-icons/io5"

const DashboardBanner = () => {
  return (
    <section className="max-w-7xl mx-auto py-14 flex justify-between items-center">
      <div className="bg-orange-200 p-10 w-72 rounded drop-shadow-lg">
        <div className="flex justify-center items-center gap-5">
          <FcPaid className="text-4xl" />
          <h4 className="text-2xl font-medium">Total Orders</h4>
        </div>
        <h6 className="text-3xl font-medium text-center mt-4">1200</h6>
      </div>
      <div className="bg-orange-200 p-10 w-72 rounded drop-shadow-lg">
        <div className="flex justify-center items-center gap-5">
          <IoFastFoodOutline className="text-3xl" />
          <h4 className="text-2xl font-medium">Total Menu</h4>
        </div>
        <h6 className="text-3xl font-medium text-center mt-4">1200</h6>
      </div>
      <div className="bg-orange-200 p-10 w-72 rounded drop-shadow-lg">
        <div className="flex justify-center items-center gap-5">
          <FcCandleSticks className="text-3xl" />
          <h4 className="text-2xl font-medium">Categories</h4>
        </div>
        <h6 className="text-3xl font-medium text-center mt-4">1200</h6>
      </div>
      <div className="bg-orange-200 p-10 w-72 rounded drop-shadow-lg">
        <div className="flex justify-center items-center gap-5">
          <FcMoneyTransfer className="text-3xl" />
          <h4 className="text-2xl font-medium">Total Income</h4>
        </div>
        <h6 className="text-3xl font-medium text-center mt-4">1200</h6>
      </div>
    </section>
  )
}

export default DashboardBanner