"use client";

import useAuth from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { createContext } from 'react'

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const { user } = useAuth();

    const { data: cart = {}, refetch, isLoading } = useQuery({
        queryKey: ["cart", user?.email],
        queryFn: async () => {
            try {
                const response = await axios.get(`http://localhost:4000/carts/${user?.email}`);
                return response.data;
            } catch (error) {
                console.log(error?.message);
            }
        }
    });

    return (
        <CartContext.Provider value={{ cart, refetch, isLoading }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;