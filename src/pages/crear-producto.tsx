import { randomUUID } from "crypto";
import Form from "../components/Form";
import { prisma } from "../server/db/client";
import { FormEvent } from 'react';

export default function CrearProducto(props) {

  const createProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const product = Object.fromEntries(new FormData(e.target as HTMLFormElement))
    const response = await fetch("/api/products/create",{
      method: "POST",
      body: JSON.stringify(product)
    });
    const data = await response.json();
  };

  return (
    <div>
      <h1>Seccion Crear Producto</h1>
      <Form onSubmit={createProduct}></Form>
    </div>
  );
}
