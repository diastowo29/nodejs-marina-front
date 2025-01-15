// import { PrismaClient } from '@prisma/client'
import { NextRequest } from 'next/server';
// const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
    // const channel = request.nextUrl.searchParams.get('c');
    // const allProducts = await prisma.main_products.findMany({
    //     include: {
    //         shop_id: {
    //             include: {
    //                 channel: true
    //             }
    //         },
    //         product_img:true
    //     },
    //     ...(channel && {
    //         where: {
    //             shop_id: {
    //                 channel :{
    //                     name: channel
    //                 }
    //             }
    //         }
    //     })
    // });
    // return Response.json(allProducts);
    return Response.json({});

}


export async function POST(request: Request) {
    // const req = await request.json();
    // const createProduct = await prisma.main_products.create({
    //     data: {
    //         // condition: 1,
    //         // desc: req.
    //     }
    // });
    // return Response.json({
    //     channel: createProduct
    // });
    return Response.json({});

}