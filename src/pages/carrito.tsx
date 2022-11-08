import Link from "next/link";
import { monitorEventLoopDelay } from "perf_hooks";
import { useEffect, useState } from "react";
import { prisma } from '../server/db/client';



export default function Carrito(props) {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  
  useEffect(() => {
    const localCart = localStorage.getItem('cart');
    if(cart) {
      fetch(`/api/products?products=${localCart}`)
        .then(response => response.json())
        .then(data => {
          setCart(data);
        })
    }
  }, [])
  
  useEffect(() => {
    let auxTotal = 0;
    cart.forEach(({price}) => {
      auxTotal += price;
    })
    setTotal(auxTotal);
  }, [cart])

  return (
    <div>
      <h1>Seccion Carrito de compras</h1>
      {cart.map(({id, name, price, description, inventory}) => 
        <div key={id} className='grid grid-cols-2 gap-4 place-content-around h-48 mt-48 ml-6 center justify-center'>
          <p>{name}</p>
          <p>{price}</p>
          <p>{description}</p>
          <p>{inventory}</p>
          <Link href={`/editar-producto/${name}`}>Editar</Link>
          |
          <Link href={`/ver-producto/${name}`}>Ver</Link>
          
        </div>
      )}
      <div className="total">
        <h1>El total es: {total}</h1>
      </div>
    </div>
  );
}