import { InferGetServerSidePropsType } from "next";
import Form from "../../components/Form";
import { prisma } from '../../server/db/client';
import { FormEvent } from 'react';

export async function getServerSideProps(context) {
  console.log(context.query);
  const product = await prisma.product.findUnique({where: {
    name: context.query.id
  }})
  return {
    props: { product }, // will be passed to the page component as props
  }
}

export default function EditarProducto(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const updateProduct = async (e: FormEvent<HTMLFormElement>) => {
    const product = Object.fromEntries(new FormData(e.target as HTMLFormElement))
    const response = await fetch("/api/products/edit",{
      method: "PUT",
      body: JSON.stringify({product, oldName: props.product?.name})
    });
    const data = await response.json();

    console.log(data);
  };

  return (
    <div>
      <h1>Seccion Editar Producto</h1>
      <Form {...props.product} onSubmit={updateProduct} edit></Form>
    </div>
  );
}