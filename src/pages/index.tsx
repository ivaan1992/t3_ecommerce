import { prisma } from '../server/db/client';
import { InferGetServerSidePropsType } from "next";
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
    
    <div>
      <h1>Seccion principal</h1>
      {props.allProducts.map(({id, name, price, description, inventory}) => 
        <div key={id}>
          <p>{name}</p>
          <p>{price}</p>
          <p>{description}</p>
          <p>{inventory}</p>
          <Link href={`/editar-producto/${name}`}>Editar</Link>
          |
          <Link href={`/ver-producto/${name}`}>Ver</Link>
          |
          <Add productID={id} />
        </div>
      )}
    </div>
  );
}