import { randomUUID } from 'crypto';
import type {Request, Response} from 'express';
import { prisma } from '../../../server/db/client';

export default async function Create(req: Request, res: Response) {
    const { method, body} = req;
    const {
        name,
        description,
        price,
        inventory
    } = JSON.parse(body);
    console.log(name, description, price, inventory)
    if(method === 'POST') {
        try {
            const product = await prisma.product.create({
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