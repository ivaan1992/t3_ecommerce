import Image from "next/image";
import Link from "next/link";


export default function Navbar() {
  return (
    <div className="flex justify-around">
      <nav>
        <Link href="/">
          <Image src="/images/logo.png"
            width={100}
            height={100}
            alt="logo-store" />
        </Link>   
      </nav>

      <nav>
        <ul className="flex">
            <li className="ml-8">
              <Link href="/crear-producto">
                Crear Producto
              </Link>    
            </li>
            
            <li className="ml-8">
                <Link href="/editar-producto">
                  Editar Producto
                </Link>
            </li>

            <li className="ml-8">
                <Link href="/carrito">
                    Carrito De Compras
                </Link>
            </li>
        </ul>
      </nav>
    </div>
  )
}