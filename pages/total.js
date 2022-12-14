import { useEffect, useCallback } from "react"
import useQuiosco from "../Hooks/useQuiosco"
import Layout from "../layout/Layout"
import {formatearDinero} from '../helpers'

//Esta es la url del total o lo que muestra lo que pagamos y enviamos al DB a pedir
export default function Total(){
    //luego de importar el custom hook se aplica destructuring y se utiliza de esta manera
    const {pedido, nombre, setNombre, colocarOrden, total} = useQuiosco()

    // esta funcion es para comprobar el pedido y se pone dentro de un callback para que se pueda mantener el pedido seleccionado
    // y asi navegar por la aplicacion sin perder la seleccion del producto y asi poder llenar el formulario de envio de datos hacia
    // la base de datos
    const comprobarPedido = useCallback(() => {
        return pedido.length === 0 || nombre === '' || nombre.length < 3;
    },[pedido, nombre])
  
    useEffect(() => {
      comprobarPedido()
    }, [pedido, comprobarPedido])
    
  

    return(
        <Layout pagina='Total y Confirmar Pedido'>
            <h1 className="text-4xl font-black">Total y Confirmar Pedido</h1>
            <p className="text-2xl my-10">Confirma tu pedido a continuación</p>

            <form
                onSubmit={colocarOrden}
            >
                <div>
                    <label htmlFor="nombre" className="block uppercase text-slate-800 font-bold text-xl">Nombre</label>

                    <input
                        type='text'
                        className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md"
                        name="nombre"
                        id='nombre'
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div className="mt-10">
                    <p className="text-2xl">Total a Pagar {''} <span className="font-bold">{formatearDinero(total)}</span></p>
                </div>

                <div className="mt-5">
                    <input
                        type='submit'
                        className={`${comprobarPedido() ? 'bg-indigo-100' : 'bg-indigo-600 hover:bg-indigo-800'} w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white text-center`}
                        value='Confirmar Pedido'
                        disabled={comprobarPedido()}
                    />
                </div>

            </form>

       </Layout>
    )
}