import Link from "next/link"
import { useEffect, useState } from "react";
import OrderDeliveryTimeline from "../Shared/OrderDeliveryTimeline";
import axios from "axios";
import { toast } from "react-toastify";

const Order = ({ order, ordersRefetch }) => {
    const [totalOrderNumber, setTotalOrderNumber] = useState(0);

    const [deliveryStatusDialog, setDeliveryStatusDialog] = useState(false);

    useEffect(() => {
        setTotalOrderNumber(order?.orderedItems?.reduce((total, prev) => total + prev.quantity, 0));
    }, [order]);

    const handleUpdateDeliveryStatus = async (e, id) => {
        e.preventDefault();

        const form = e.target;

        const updatedDeliveryStatus = form.deliverystatus.value;

        if (updatedDeliveryStatus !== "No Option To Select") {
            try {
                const response = await axios.patch(`http://localhost:4000/orders/${id}`, {
                    deliveryStatus: updatedDeliveryStatus
                });

                if (response.status === 200) {
                    toast.success(`Order is now, ${status}`);
                    ordersRefetch();
                    setDeliveryStatusDialog(false);
                }
            } catch (error) {
                console.log(error?.message)
            }
        }
    };

    return (
        <>
            <div className="bg-orange-100 rounded px-7 drop-shadow-lg">
                <OrderDeliveryTimeline orderInfo={order} />
                <div className="flex justify-center items-center gap-2">
                    <div className="flex flex-col items-end">
                        <h4 className="text-lg font-medium leading-8">
                            Order Number:
                        </h4>
                        <h4 className="text-lg font-medium leading-8">
                            Customer Name:
                        </h4>
                        <h4 className="text-lg font-medium leading-8">
                            Delivery Address:
                        </h4>
                        <h4 className="text-lg font-medium leading-8">
                            Order Quantity:
                        </h4>
                        <h4 className="text-lg font-medium leading-8">
                            Total Amount:
                        </h4>
                    </div>
                    <div className="flex flex-col items-start">
                        <h4 className="ms-2 text-base font-normal leading-8 mt-1">{order?._id}</h4>
                        <h4 className="ms-2 text-base font-normal leading-8">{order?.customerName}</h4>
                        <h4 className="ms-2 text-base font-normal leading-8">{order?.customerAddress}, {order?.customerCity}</h4>
                        <h4 className="ms-2 text-base font-normal leading-8">{totalOrderNumber}</h4>
                        <h4 className="ms-2 text-base font-normal leading-8">BDT. {order?.total}</h4>
                    </div>
                </div>
                <div className="py-7 flex justify-center items-center gap-7">
                    <Link href={`/business/orders/${order?._id}`} className="bg-green-600 text-white text-sm rounded py-1.5 px-4">
                        View Details
                    </Link>
                    <button onClick={() => setDeliveryStatusDialog(true)} className="bg-orange-600 text-white text-sm rounded py-1.5 px-4">
                        Update Delivery Status
                    </button>
                </div>
            </div>
            {
                deliveryStatusDialog && (
                    <dialog className="max-w-5xl mx-auto px-40 pt-14 pb-24 bg-orange-50 border border-orange-300 rounded flex flex-col items-center justify-center fixed top-1/2 -translate-y-1/2 z-10 shadow-lg">
                        <h4 className="text-xl font-medium mb-10">Update Delivery Status</h4>
                        <form onSubmit={(e) => handleUpdateDeliveryStatus(e, order?._id)} className="flex flex-col justify-center items-center gap-7">
                            <select name="deliverystatus" className="bg-orange-200 px-4 py-1.5 rounded-sm cursor-pointer">
                                <option value="In Kitchen" disabled={order?.deliveryStatus === "Pending" ? false : true}>
                                    In Kitchen
                                </option>
                                <option value="In Delivery" disabled={order?.deliveryStatus === "In Kitchen" ? false : true}>
                                    In Delivery
                                </option>
                                <option value="Cancelled" disabled={order?.deliveryStatus === "Pending" ? false : true}>
                                    Cancelled
                                </option>
                                {
                                    (order?.deliveryStatus === "In Delivery" || order?.deliveryStatus === "Delivered" || order?.deliveryStatus === "Cancelled") && <option aria-disabled={true} className="pointer-events-none">No Option To Select</option>
                                }
                            </select>
                            <input type="submit" value="Update Status" className="px-5 py-1.5 bg-green-600 text-white rounded cursor-pointer" />
                        </form>
                        <div onClick={() => setDeliveryStatusDialog(false)} className="px-2 py-0.5 bg-red-600 text-white rounded absolute top-2 right-3 cursor-pointer">
                            X
                        </div>
                    </dialog>
                )
            }
        </>
    )
}

export default Order