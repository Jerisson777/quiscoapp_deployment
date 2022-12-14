import { useRouter} from 'next/router'

//aqui creamos la navegacion de la app de manera dinamica durante una transaccion para jacer el pedido
const pasos = [
    {paso: 1, nombre:'Menu', url:'/'},
    {paso: 2, nombre:'Resumen', url:'/resumen'},
    {paso: 3, nombre:'Datos y Total', url:'/total'}
]

const Pasos = () => {

    const router = useRouter()
 

    // esta funcion rellena la barra del progeso de manera dinamica mientras avanzamos por paginas
    const calcularProgreso = () => {
        let valor
        if(router.pathname === '/'){
            valor = 2
        } else if(router.pathname === '/resumen'){
            valor = 50
        } else if(router.pathname === '/total'){
            valor = 100
        }

        return valor
    }
    return( 
        <>
            <div className="flex justify-between">
                {pasos.map((paso) => (
                    <button
                        onClick={() => {
                            router.push(paso.url)
                        }}
                        className="text-2xl font-bold" 
                        key={paso.paso}>{paso.nombre}</button>
                ))}
            </div>

            <div className='bg-gray-100 mb-10'>
                <div className='rounded-full bg-green-500 text-xs leading-none h-2 text-center text-white'
                style={{width: `${calcularProgreso()}%`}}></div>
            </div>
        </>
    )
}

export default Pasos;