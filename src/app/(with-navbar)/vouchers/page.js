'use client';

import Voucher from "@/components/Shared/Voucher";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Vouchers = () => {
    const { data: vouchers = [] } = useQuery({
        queryKey: ['vouchers'],
        queryFn: async () => {
            try {
                const response = await axios.get('http://localhost:4000/vouchers');

                if (response?.status === 200) {
                    return response?.data;
                }
            } catch (error) {
                console.log(error?.message);
            }
        }
    });

    return (
        <section className="py-24">
            <h2 className="text-center text-3xl font-semibold">
                All The Vouchers
            </h2>
            <div className="mt-20 max-w-7xl mx-auto flex justify-center items-center gap-20">
                {
                    vouchers?.map((voucher) => {
                        return (
                            <Voucher voucher={voucher} isRestaurantNameShown={true} isCopyCodeShown={true} key={voucher?._id} />
                        )
                    })
                }
            </div>
        </section>
    )
}

export default Vouchers;