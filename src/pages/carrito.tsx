import Link from "next/link";
import { monitorEventLoopDelay } from "perf_hooks";
import { useEffect, useState } from "react";
import CartCard from "../components/cart-card";
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
  }, [cart, cartItems])

  return (
    <div>
      <h1 className='text-center mt-5 text-3xl'>Seccion Carrito de compras</h1>
      <CartCard allProducts={[]} />
    </div>
  );
}