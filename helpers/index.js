
//este helper o funcion reutilizable para formatear el dinero a moneda americana
export const formatearDinero = (cantidad) => {
    return cantidad.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    })
}
