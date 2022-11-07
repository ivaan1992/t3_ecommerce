import { randomUUID } from 'crypto';
import type {Request, Response} from 'express';
import { prisma } from '../../../server/db/client';

export default async function Create(req: Request, res: Response) {
    const { method, body} = req;
    const jsonBody = JSON.parse(body);
    const {
        name,
        description,
        price,
        inventory,
    } = jsonBody.product;
    console.log(name, description, price, inventory)
    if(method === 'PUT') {
        try {
            const product = await prisma.product.update({
                where: {
                    name: jsonBody.oldName,
                },
                data: {
                  name,
                  description,
                  price: parseInt(price),
                  inventory: parseInt(inventory),
                }
              })
            return res.status(200).json(product);
        } catch(err){
            console.log(err);
            return res.status(500).json({err});
        }
    }

    return res.status(400).json({
        message: 'forbiden'
    })
}