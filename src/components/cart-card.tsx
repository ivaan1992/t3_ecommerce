import Image from 'next/image';
import { useEffect, useState } from "react";
interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    inventory: number;
}

interface Props {
    allProducts: Product[]
}

export default function CartCard(props: Props) {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    const localCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') as string) : {} ;
    if(localCart) {
      fetch(`/api/products?products=${JSON.stringify(Object.keys(localCart))}`)
        .then(response => response.json())
        .then(data => {
          setCart(data);
          setCartItems(localCart);
        })
    }
  }, [])

  useEffect(() => {
    let auxTotal = 0;
    cart.forEach(({price, id}) => {
      auxTotal += (price * cartItems[id]);
    })
    setTotal(auxTotal);
  }, [cart, cartItems])

    return (
        
        
            <div className="max-w-sm w-full lg:max-w-full lg:flex">
                {cart.map(({id, name, price,}) => 
                    <div key={id}>
                       <div className="mt-5 ml-10">
                           <Image src="/images/nia.jpg" alt="" width={100} height={50}/>
                       </div>
                       <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                        <div className="mb-8">
                            <div className="text-gray-900 font-bold text-xl mb-2">{name}</div>
                            <p>Articulos agregados: {cartItems[id]}</p>
                            <p className="text-gray-700 text-base">${price}.00</p>
                            <p>Total producto: {price * cartItems[id]}</p>
                        </div>
                       </div>
                    </div>
                    
                )}
                <div className="total mt-10">
                  <h1 className='text-center mt-5 text-2xl'>El total de la compra es de: $ {total}.00</h1>
                </div>
               
            </div>
            
        

        
    )
}