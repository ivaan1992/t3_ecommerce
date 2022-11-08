import { prisma } from '../server/db/client';
import type { InferGetServerSidePropsType } from "next";
import Link from 'next/link';
import Add from '../components/Add';

export async function getServerSideProps(context) {
  const allProducts = await prisma.product.findMany()
  return {
    props: { allProducts }, // will be passed to the page component as props
  }
}

export default function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(props.allProducts);

  return (
    
    <div className=''>
      <h1>Tienda en Linea</h1>
      <div className='grid grid-cols-2 gap-4 place-content-around h-48 mt-48 ml-6 center justify-center'>
        {props.allProducts.map(({id, name, price, description, inventory}) => 
          <div key={id} className="cards ">
            <p>Producto: {name}</p>
            <p>$ Precio: {price}</p>
            <p>Descripcion del producto: {description}</p>
            <p>Cantidades Disponibles: {inventory}</p>
            <br />
            <Link href={`/editar-producto/${name}`}>Editar</Link>
            |
            <Link href={`/ver-producto/${name}`}>Ver</Link>
            |
            <Add productID={id} />
          </div>
        )}
      </div>
      
    </div>
  );
}