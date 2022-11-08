import { randomUUID } from 'crypto';
import type {Request, Response} from 'express';
import { prisma } from '../../../server/db/client';

export default async function Create(req: Request, res: Response) {
    const { method, query} = req;
    
    const id = query.id as string;

    if(method === 'GET') {
        try {
            const product = await prisma.product.findUnique({
                where: {
                    id
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