import '../styles/globals.css'
import { QuioscoProvider } from '../Context/QuioscoProvider'
//aqui solo colocamos el provider para que rodee todos los componentes de esta aPP
function MyApp({ Component, pageProps }) {
  return (
    <QuioscoProvider>
      <Component {...pageProps} />
    </QuioscoProvider>
  )
}

export default MyApp
