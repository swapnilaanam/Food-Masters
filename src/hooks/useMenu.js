'use client';

import { MenuContext } from "@/providers/MenuProvider";
import { useContext } from "react";

const useMenu = () => {
    const menu = useContext(MenuContext);
    return menu;
}

export default useMenu;