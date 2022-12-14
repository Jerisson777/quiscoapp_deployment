import {useState, useEffect, createContext, use} from 'react'
import axios from 'axios'
import { toast} from 'react-toastify'
import { useRouter } from 'next/router'

//creacion del context
const QuioscoContext = createContext()

//creacion del provider que es la funcion que almacena las funciones que seran usadas por todos los componentes hijos
const QuioscoProvider = ({children}) => {

    //uso del router de nextJS
    const router = useRouter()

    //Todos los states que tiene la aplicacion
    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)
    const [pedido, setPedido] = useState([])
    const [nombre, setNombre] = useState('')
    const [total, setTotal] = useState(0)


    //funcion que obtiene las categorias y las pasa al state para mostrarlas 
    const obtenerCategorias = async () => {
        const { data } = await axios('/api/categorias')
        setCategorias(data)
    }

    //useEffect que muestra las categorias y muestra el cambio si algo cambio
    useEffect (() => {
        obtenerCategorias()
    },[])

    //UseEffect que hace que cuando damos click en una categoria se mantenga resaltada dicha categoria
    useEffect(() => {
        setCategoriaActual(categorias[0])
    }, [categorias])
    
    //useEffect que hace el calculo en tiempo real del subtotal y cambia siempre que se actualice algo
    useEffect(() => {
      const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto. cantidad) + total, 0)

      setTotal(nuevoTotal)
    }, [pedido])
    

    //funcion detecta la categoria seleccionada y muestra los articulos de esa categoria
    const handleClickCategoria = id => {
        const categoria = categorias.filter(cat => cat.id === id)
        setCategoriaActual(categoria[0])

        router.push('/')
    }

    //funcion que obtiene el producto seleccionado o que lo identifica
    const handleSetProducto = producto => {
        setProducto(producto)
    }

    //funcion para mostrar el modal cuando se haga click en algun producto
    const handleChangeModal = () => {
        setModal(!modal)
    }

    //funcion para agregar un pedido al state y en caso de que cambien la cantidad se actualiza sin crear otro registro en el state
    const handleAgregarPedido = ({categoriaId, ...producto}) => {
        if(pedido.some(productoState => productoState.id === producto.id)){
            //Actualizar pedido cuando se repite 
            const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto: productoState)
            setPedido(pedidoActualizado)

            toast.success('Guardado Correctamente')
        } else {
            setPedido([...pedido, producto])
            toast.success('Agregado al pedido')
        }
        setModal(false)
       
    }

    //funcion para editar las cantidades del producto
    const handleEditarCantidades = id => {
        const productoActualizar = pedido.filter( producto => producto.id === id)

        setProducto(productoActualizar[0])

        setModal(!modal)
    }

    //funcion para eliminar un producto del resumen de productos antes de crear el pedido
    const handleEliminarProducto = id => {
        const eliminarProducto = pedido.filter(producto => producto.id !== id)

        setPedido(eliminarProducto)
    }

    //funcion que hace la consulta o el envio de datos hacia la base de datos o sea que envia los registros a la DB
    const colocarOrden = async e => {
        e.preventDefault()

        try {
            await axios.post('/api/ordenes', {pedido, nombre, total, fecha: Date.now().toString()})
            
            //Resetear la app para evitar duplicados
            setCategoriaActual(categorias[0])
            setPedido([])
            setNombre('')
            setTotal(0)

            toast.success('Pedido Realizado Correctamente')

            setTimeout(() => {
                router.push('/')
            }, 3000)

        } catch (error) {
            console.log(error)    
        }
        
    }


    //aqui se pasan los children o se hacen disponibles las funciones y estados de la aplicacion para que pasen hacia los hijos
    //sin problemas y asi funcione el arbol correctamente
    return(
        <QuioscoContext.Provider
            value={{
                categorias,
                modal,
                categoriaActual,
                producto,
                pedido,
                nombre,
                setNombre,
                total,
                handleClickCategoria,
                handleSetProducto,
                handleChangeModal,
                handleAgregarPedido,
                handleEditarCantidades,
                handleEliminarProducto,
                colocarOrden
            }}
        >
            {children}
        </QuioscoContext.Provider>
    )
}

//primero se exporta el provider
export {
    QuioscoProvider
}

//y luego el context
export default QuioscoContext