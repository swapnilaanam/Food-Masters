'use client';

import { useContext } from 'react'
import { BusinessMenuContext } from '@/providers/BusinessMenuProvider'

const useBusinessMenu = () => {
    const businessMenu = useContext(BusinessMenuContext);
    return businessMenu;
}

export default useBusinessMenu;