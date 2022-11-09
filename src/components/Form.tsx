import { format } from "path";
import type { FormEvent } from "react";

interface Props {
    onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
    name?: string;
    price?: number;
    inventory?: number;
    description?: string;
    edit?: boolean;
}

export default function Form({onSubmit,name, price, inventory, description, edit}: Props) {
  
  return (
        <form onSubmit={(e) => {
            e.preventDefault();
            onSubmit?.(e)
        }} className="flex flex-col ml-20">
        <label htmlFor="" className="mt-6">
          Nombre
          <input type="text" name="name" defaultValue={name} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 w-48" />
        </label>
        <label htmlFor="" className="mt-6">
          Precio
          <input type="text" name="price" defaultValue={price} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 w-48"/>
        </label>
        <label htmlFor="" className="mt-6">
          Inventario
          <input type="text" name="inventory" defaultValue={inventory} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 w-48"/>
        </label>
        <label htmlFor="" className="mt-6">
          Descripcion
          <textarea name="description" defaultValue={description} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 w-80 max-h-36"></textarea>
        </label>
        <button className="flex-col mt-10 ml-20 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-20">{ edit ? 'Editar' : 'Crear' }</button>
      </form>
    )
}