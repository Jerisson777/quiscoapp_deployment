import Image from 'next/image'
import useQuiosco from '../Hooks/useQuiosco'
import Categoria from './Categoria'

//Esta funcion es la barra de la izquierda que nos muestra el logo de la app y sus diferentes categorias mas abajo
const Sidebar = () => {

  const {categorias} = useQuiosco()

  return (
    <>
        <Image width={200} height={100} src='/assets/img/logo.svg' alt='imagen Logotipo'/>

        <nav className='mt-10'>
            {categorias.map((categoria) => (
              <Categoria
                key={categoria.id}
                categoria={categoria}
              />
            ))}
        </nav>
    </>
  )
}

export default Sidebar