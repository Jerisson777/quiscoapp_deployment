import Layout from "../layout/Layout"
import useQuiosco from "../Hooks/useQuiosco"
import ResumenProducto from "../Components/ResumenProducto"

//Esta es el resumen o lo que muestra la posible canaste de compra o lo que hayamos seleccionado para pedir
export default function Resumen(){
    const {pedido} = useQuiosco()
    return(
       <Layout pagina='Resumen'>
            <h1 className="text-4xl font-black">Resumen</h1>
            <p className="text-2xl my-10">Revisa tu Pedido</p>

            {pedido.length === 0 ? (
                <p className="text-center text-2xl">No hay elementos en tu Pedido</p>
            ) : (
                pedido.map(producto =>(
                    <ResumenProducto
                        key={producto.id}
                        producto={producto}
                    />
                ))
            )}
       </Layout>
    )
}