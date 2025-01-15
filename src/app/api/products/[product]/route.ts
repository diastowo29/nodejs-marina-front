// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient()

export async function GET(request:Request, { params } : any) {
    // const product = await prisma.main_products.findUnique({
    //     where: {
    //         id: Number.parseInt(params.product)
    //     },
    //     include: {
    //         shop_id: {
    //             include: {
    //                 channel: true
    //             }
    //         },
    //         product_img:true
    //     }
    // })
    // return Response.json(product ? product:[]);
    return Response.json({});

}