// De esta manera creamos el custom hook de nuestro context para usarlo por todo el arbol de componentes

import { useContext } from "react";
import QuioscoContext from '../Context/QuioscoProvider'

const useQuiosco = () => {
    return useContext(QuioscoContext)
}

export default useQuiosco