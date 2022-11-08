import { useEffect, useState } from 'react';
interface Props {
    productID: string;
}

interface LocalStorageType {
    [productID: string]: number;
}

function getCartLocalStorage(): string {
    if(!localStorage.getItem('cart')) {
        localStorage.setItem('cart', '{}')
    }

    return  localStorage.getItem('cart') as string;
}


export default function Add({productID}: Props) {
    
    const handleAdd = () => {  
      /*
        {
            "1231231231": 3,
            "1231231231": 2,
        }
      */

        const localCart = JSON.parse(getCartLocalStorage()) as LocalStorageType ;
        localCart[productID] = localCart[productID] == null ? 1 : parseInt(localCart[productID] as any) + 1;
        localStorage.setItem('cart', JSON.stringify(localCart))
    }


    
    return (
        <>
            <button onClick={handleAdd}>Agregar</button>
        </>
    )
}

function objCart(localCart: string | null): any {
    throw new Error('Function not implemented.');
}
