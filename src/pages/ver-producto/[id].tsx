import { prisma } from '../../server/db/client';
import type { InferGetServerSidePropsType } from "next";
import Image from 'next/image';

export async function getServerSideProps(context) {

    const product = await prisma.product.findUnique({where: {
      name: context.query.id
    }})
    return {
      props: { product }, // will be passed to the page component as props
    }
}

export default function VerProducto(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const deleteProduct = () => {
        fetch(`/api/products/delete?id=${props.product?.id}`, {
            method: 'DELETE',
        });
    }
    
    return (
      <div className='flex flex-col'>
        <h1>Seccion Ver Producto</h1>
        <ul className='flex flex-col'>
          <li>
            <Image src="/images/nia.jpg" alt="" width={300} height={300}/>
          </li>
          <li>Producto: {props.product?.name}</li>
          <li>Descripcion: {props.product?.description}</li>
          <li>Precio: {props.product?.price}</li>
          <li>Disponibles: {props.product?.inventory}</li>
        </ul>
        <button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ml-6 w-20 mt-5' onClick={deleteProduct}>Borrar</button>
      </div>
    );
  }