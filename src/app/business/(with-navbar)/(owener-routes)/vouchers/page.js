'use client';

import AddVoucher from "@/components/Business/AddVoucher";
import BusinessBanner from "@/components/Shared/BusinessBanner";
import Voucher from "@/components/Shared/Voucher";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Vouchers = () => {
    const { data: vouchers = [], refetch } = useQuery({
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
        <main>
            <BusinessBanner title="Voucher" />
            <section className="py-12">
                <AddVoucher refetch={refetch} />
                {
                    vouchers?.length === 0 && (
                        <h4 className="mt-14 text-center text-2xl font-medium">No Vouchers Are Available Right Now...</h4>
                    )
                }
                <div className="py-20 max-w-7xl mx-auto flex justify-center items-center gap-20">
                    {
                        vouchers?.map((voucher) => (
                            <Voucher voucher={voucher} isRestaurantNameShown={false} isCopyCodeShown={false} key={voucher?._id} />
                        ))
                    }
                </div>
            </section>
        </main>
    )
}

export default Vouchers;