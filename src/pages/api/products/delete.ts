import { randomUUID } from 'crypto';
import type {Request, Response} from 'express';
import { prisma } from '../../../server/db/client';

export default async function Create(req: Request, res: Response) {
    const { method, query} = req;
    const {id} = query;

    if(method === 'DELETE') {
        try {
            const product = await prisma.product.delete({
                where: {
                    id: id as string,
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