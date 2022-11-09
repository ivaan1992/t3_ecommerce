import Image from "next/image";
import Link from 'next/link';
import Add from './Add';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    inventory: number;
}

interface Props {
    allProducts: Product[]
}

export default function CardProduct(props: Props) {
    console.log(props.allProducts);
      
    return (
        <div className="w-3/4 mx-auto mt-10 rounded overflow-hidden shadow-lg grid grid-cols-3 gap-5 place-content-center h-100">
            {props.allProducts.map(({id, name, price, description, inventory}) => 
                <div key={id} className="flex flex-col border-2 border-blue-400 shadow-md">
                    <Image src="/images/nia.jpg" alt="" width={100} height={100}/>
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2">{name}</div>
                      <p className="text-gray-700 text-base"> Descripcion del producto: 
                        {description}
                      </p>
                      <p className="text-gray-700 text-base">
                        Precio: 
                        {price}
                      </p>
                      <p className="text-gray-700 text-base">
                        Productos Disponibles:
                        {inventory}
                      </p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                      <Link href={`/editar-producto/${name}`} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Editar</Link>
                      <Link href={`/ver-producto/${name}`}className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Ver</Link>
                      <Add productID={id} />
                    </div>
                </div>
            )}
        </div>
    )
}