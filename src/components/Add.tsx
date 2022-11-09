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
        fetch(`/api/products/${productID}`)
            .then(response => response.json())
            .then(({inventory}) => {
                const localCart: LocalStorageType = JSON.parse(getCartLocalStorage()) as LocalStorageType ;
                localCart[productID] = localCart[productID] == null ? 1 : parseInt(localCart[productID] as any) + 1;
                if((localCart[productID] as number) <= inventory) {
                    alert('Producto Agregado')
                    localStorage.setItem('cart', JSON.stringify(localCart))
                } else {
                    alert('Producto Agotado');
                }
            })
    }


    
    return (
        <>
            <button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ml-6' onClick={handleAdd}>Agregar</button>
        </>
    )
}

function objCart(localCart: string | null): any {
    throw new Error('Function not implemented.');
}
