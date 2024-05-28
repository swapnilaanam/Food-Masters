'use client';

import AddVoucher from "@/components/Business/AddVoucher";
import BusinessBanner from "@/components/Shared/BusinessBanner";
import Voucher from "@/components/Shared/Voucher";
import useAuth from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Vouchers = () => {
    const {user} = useAuth();

    const { data: vouchers = [], refetch } = useQuery({
        queryKey: ['vouchers'],
        queryFn: async () => {
            try {
                const response = await axios.get(`https://food-masters-server-production.up.railway.app/vouchers/${user?.email}`);

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
            <section className="py-12 px-4 2xl:px-0">
                <AddVoucher refetch={refetch} />
                <div className="py-20 max-w-7xl mx-auto flex justify-center items-center gap-20 flex-wrap">
                    {
                        vouchers.length === 0 && (
                            <h4 className="text-xl font-medium text-center">
                                No Vouchers Available For This Restaurant...
                            </h4>
                        )
                    }
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