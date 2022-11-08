import Link from "next/link";
import { monitorEventLoopDelay } from "perf_hooks";
import { useEffect, useState } from "react";
import { prisma } from '../server/db/client';



export default function Carrito(props) {
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
  }, [cart])

  return (
    <div>
      <h1>Seccion Carrito de compras</h1>
      {cart.map(({id, name, price, inventory}) => 
        <div key={id} className='grid grid-cols-2 gap-4 place-content-around h-48 mt-48 ml-6 center justify-center'>
          <p>Producto: {name}</p>
          <p>Costo: {price * cartItems[id]}</p>
          <p>Articulos agregados: {cartItems[id]}</p>
          <Link href={`/editar-producto/${name}`}>Editar</Link>
          |
          <Link href={`/ver-producto/${name}`}>Ver</Link>
          
        </div>
      )}
      <div className="total">
        <h1>El total de la compra es de: {total}</h1>
      </div>
    </div>
  );
}