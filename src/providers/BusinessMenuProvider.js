'use client';

import { createContext, useState } from "react";

export const BusinessMenuContext = createContext();

const BusinessMenuProvider = ({ children }) => {
    const [isBusinessMenuOpen, setIsBusinessMenuOpen] = useState(false);

    return (
        <BusinessMenuContext.Provider value={{ isBusinessMenuOpen, setIsBusinessMenuOpen }}>
            {
                children
            }
        </BusinessMenuContext.Provider>
    )
}

export default BusinessMenuProvider;