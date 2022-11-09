import { prisma } from '../server/db/client';
import type { InferGetServerSidePropsType } from "next";
import CardProduct from '../components/cards';

export async function getServerSideProps() {
  const allProducts = await prisma.product.findMany()
  return {
    props: { allProducts }, // will be passed to the page component as props
  }
}

export default function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(props.allProducts);

  return (
    
    <div className=''>
      <h1 className='text-center mt-5 text-3xl'>Tienda en Linea</h1>
      <CardProduct allProducts={props.allProducts} />    
    </div>
  );
}