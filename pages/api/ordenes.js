import { PrismaClient } from "@prisma/client";
// este Endpoint es para poder hacer el query a la base de datos correctamente  en este caso es POST
export default async function handler(req, res) {
    const prisma = new PrismaClient();
    if(req.method === 'POST'){
 
        const orden = await prisma.orden.create({
            data:{
                nombre: req.body.nombre,
                fecha: `${req.body.fecha}`,
                total: req.body.total,
                pedido: req.body.pedido
            }
        })
 
        res.json({orden});
    }
}