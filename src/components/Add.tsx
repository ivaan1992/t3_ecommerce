
interface Props {
    productID: string;
}

export default function Add({productID}: Props) {
    
    const handleAdd = () => {
        const localCart = localStorage.getItem('cart');
        if(localCart) {
            const objCart = JSON.parse(localCart);
            localStorage.setItem('cart', JSON.stringify([...objCart, productID]))
        }
    }
    
    return (
        <>
            <button onClick={handleAdd}>Agregar</button>
        </>
    )
}