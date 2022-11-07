import Link from "next/link";
import { useEffect, useState } from "react";

export default function Carrito(props) {
  const [cart, setCart] = useState([]);

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

  return (
    <div>
      <h1>Seccion Carrito de compras</h1>
      {cart.map(({id, name, price, description, inventory}) => 
        <div key={id}>
          <p>{name}</p>
          <p>{price}</p>
          <p>{description}</p>
          <p>{inventory}</p>
          <Link href={`/editar-producto/${name}`}>Editar</Link>
          |
          <Link href={`/ver-producto/${name}`}>Ver</Link>
        </div>
      )}
    </div>
  );
}