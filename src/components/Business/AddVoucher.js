'use client';

import useAuth from "@/hooks/useAuth";
import useAxiosSecureBusiness from "@/hooks/useAxiosSecureBusiness";
import useBusinessMenu from "@/hooks/useBusinessMenu";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AddVoucher = ({ refetch }) => {
    const [isAddVoucherModalOpen, setIsAddVoucherModalOpen] = useState(false);

    const { user } = useAuth();
    const {setIsBusinessMenuOpen} = useBusinessMenu();

    const [axiosSecureBusiness] = useAxiosSecureBusiness();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const { data: restaurantInfo = {} } = useQuery({
        queryKey: ['restaurantInfo', user?.email],
        queryFn: async () => {
            try {
                const response = await axios.get(`https://food-masters-server.vercel.app/restaurants/${user?.email}`);
                return response.data;
            } catch (error) {
                console.log(error?.message);
            }
        }
    });

    useEffect(() => {
        setIsBusinessMenuOpen(false);
    }, [setIsBusinessMenuOpen]);

    const onSubmit = async (data) => {
        let minAmount;

        switch (Number(data?.discountPercentage)) {
            case 5: {
                minAmount = 100;
                break;
            }
            case 7: {
                minAmount = 150;
                break;
            }
            case 10: {
                minAmount = 200;
                break;
            }
            case 12: {
                minAmount = 350;
                break;
            }
            case 15: {
                minAmount = 600;
                break;
            }
        };

        if (minAmount) {
            const newVoucher = {
                voucherCode: data?.voucherCode,
                discountPercentage: Number(data?.discountPercentage),
                voucherExpiry: data?.voucherExpiry,
                minimumAmount: minAmount,
                restaurantName: restaurantInfo?.restaurantName,
                restaurantEmail: restaurantInfo?.restaurantEmail
            };

            try {
                const response = await axiosSecureBusiness.post('/vouchers', newVoucher);

                if (response.status === 201) {
                    toast.success('Voucher Added Successfully...')
                    reset();
                    refetch();
                    setIsAddVoucherModalOpen(false);
                }
            }
            catch (error) {
                console.log(error?.message);
            }
        }
        // console.log(newVoucher);
    };

    return (
        <section className="w-full">
            <div className="text-center mt-12">
                <button className="bg-green-600 px-12 py-2.5 text-xl text-white font-medium rounded" onClick={() => setIsAddVoucherModalOpen(true)}>
                    Add Voucher
                </button>
            </div>
            {isAddVoucherModalOpen && (
                <div
                    className="fixed z-10 top-[52%] -translate-y-[50%] left-5 lg:left-0 right-5 lg:right-0 max-w-2xl mx-auto bg-orange-100 rounded-md p-4 shadow-xl shadow-orange-50">
                    <h2 className="text-center text-2xl font-semibold">Add Food</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-[60%] mx-auto mt-12 space-y-6">
                        <div>
                            <label htmlFor="voucherCode" className="block text-base font-medium text-gray-700">
                                Voucher Code:
                            </label>

                            <input
                                type="text"
                                id="voucherCode"
                                {...register("voucherCode", { required: true })}
                                className="mt-2 w-full h-10 rounded-sm border-2 border-gray-300 bg-white text-sm text-gray-700 shadow-sm ps-2"
                                placeholder="Voucher Code..."
                            />
                            {
                                errors.voucherCode && (
                                    <span className="text-red-600 mt-2">
                                        ** Voucher Code is required
                                    </span>
                                )
                            }
                        </div>
                        <div>
                            <label htmlFor="discountPercentage" className="block text-base font-medium text-gray-700">
                                Discount Percentage
                            </label>

                            <select
                                id="discountPercentage"
                                {...register("discountPercentage", { required: true })}
                                defaultValue={"5%"}
                                className="mt-2 w-full h-10 rounded-sm border-2 border-gray-300 bg-white text-sm text-gray-700 shadow-sm ps-2"
                            >
                                <option value="5">5%</option>
                                <option value="7">7%</option>
                                <option value="7">10%</option>
                                <option value="12">12%</option>
                                <option value="15">15%</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="voucherExpiry" className="block text-base font-medium text-gray-700">
                                Voucher Expiry:
                            </label>

                            <input
                                type="date"
                                min={new Date().toISOString().split('T')[0]}
                                id="voucherExpiry"
                                {...register("voucherExpiry", { required: true })}
                                className="mt-2 w-full ps-2 py-1.5 rounded-sm border-2 border-gray-300 bg-white text-sm text-gray-700 shadow-sm"
                            />
                            {errors.voucherExpiry && <span className="text-red-600 mt-2">** Voucher Expiry Is Required.</span>}
                        </div>
                        <div className="text-center mt-7 pb-12">
                            <input type="submit" value="Add Voucher" className="bg-green-600 text-white px-14 py-2 text-lg font-medium rounded cursor-pointer" />
                        </div>
                    </form>
                    <button onClick={() => setIsAddVoucherModalOpen(false)} className="absolute top-0 right-0 bg-red-600 text-white px-4 py-1 rounded-rt">
                        Close X
                    </button>
                </div>
            )}
        </section>
    )
}

export default AddVoucher;