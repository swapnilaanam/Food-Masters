import Image from 'next/image';

import { FaMinus, FaPlus, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import useAxiosSecure from '@/hooks/useAxiosSecure';

const CartItem = ({ userEmail, cartItem, refetch }) => {
    const [axiosSecure] = useAxiosSecure();

    const handleQuantityChange = async (actionType, cartItem) => {
        if (actionType === 'All') {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Remove It!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const response = await axiosSecure.patch(`/carts/${userEmail}`, { actionType, foodId: cartItem.foodId });

                        if (response.status === 200) {
                            refetch();
                            toast.error("Food Item Removed From The Cart!")
                        }
                    } catch (error) {
                        console.log(error?.message);
                    }
                }
            });
        }
        else {
            try {
                const response = await axiosSecure.patch(`/carts/${userEmail}`, { actionType, foodId: cartItem.foodId });

                if (response.status === 200) {
                    refetch();
                }
            } catch (error) {
                console.log(error?.message);
            }
        }
    };

    return (
        <li className="flex items-center gap-4">
            <div className="w-16 h-16 relative">
                <Image
                    fill={true}
                    src={cartItem?.foodImage}
                    alt="Food"
                    className="h-16 w-16 rounded object-cover"
                />
            </div>

            <div>
                <h3 className="text-lg text-gray-900">{cartItem?.foodName}</h3>

                <dl className="mt-1 space-y-px text-sm text-gray-600">
                    <div>
                        <dt className="inline">Food Category: </dt>
                        <dd className="inline">{cartItem?.foodCategory}</dd>
                    </div>

                    <div>
                        <dt className="inline">Price: </dt>
                        <dd className="inline">{cartItem?.foodPrice} Tk.</dd>
                    </div>
                </dl>
            </div>

            <div className="flex flex-1 items-center justify-end gap-2">
                <form>
                    <label htmlFor="Line1Qty" className="sr-only"> Quantity </label>

                    <div className="flex justify-center items-center gap-3">
                        {
                            cartItem?.quantity > 1 && <FaMinus className="text-sm cursor-pointer hover:text-red-600" onClick={() => handleQuantityChange("Minus", cartItem)} />
                        }
                        <input
                            type="number"
                            min="1"
                            value={cartItem?.quantity}
                            id="Line1Qty"
                            className="h-8 w-12 rounded border-gray-100 bg-white p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                        />
                        <FaPlus className="text-sm cursor-pointer hover:text-green-600" onClick={() => handleQuantityChange("Plus", cartItem)} />
                    </div>
                </form>

                <button className="ms-4 text-gray-600 transition hover:text-red-600">
                    <span className="sr-only">Remove item</span>

                    <FaTrashAlt className="text-sm cursor-pointer" onClick={() => handleQuantityChange("All", cartItem)} />
                </button>
            </div>
        </li>
    )
}

export default CartItem;