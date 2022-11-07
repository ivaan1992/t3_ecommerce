import { prisma } from '../../server/db/client';
import { InferGetServerSidePropsType } from "next";

export async function getServerSideProps(context) {
    console.log(context.query);
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
      <div>
        <h1>Seccion Ver Producto</h1>
        {JSON.stringify(props.product)}
        <button onClick={deleteProduct}>Borrar</button>
      </div>
    );
  }