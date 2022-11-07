import type { FormEvent } from "react";

interface Props {
    onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
    name?: string;
    price?: number;
    inventory?: number;
    description?: string;
    edit?: boolean;
}

export default function Form({onSubmit, name, price, inventory, description, edit}: Props) {
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            onSubmit?.(e)
        }}>
        <label htmlFor="">
          Nombre
          <input type="text" name="name" defaultValue={name} />
        </label>
        <label htmlFor="">
          Precio
          <input type="text" name="price" defaultValue={price}/>
        </label>
        <label htmlFor="">
          Inventario
          <input type="text" name="inventory" defaultValue={inventory}/>
        </label>
        <label htmlFor="">
          Descripcion
          <textarea name="description" defaultValue={description}></textarea>
        </label>
        <button>{ edit ? 'Editar' : 'Crear'}</button>
      </form>
    )
}