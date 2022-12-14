import { PrismaClient } from "@prisma/client"
// este Endpoint es para mostrar los productos de la base de datos ya creada
export default async function handler(req, res) {
    const prisma = new PrismaClient()
    const productos = await prisma.producto.findMany()
    res.status(200).json(productos)
}