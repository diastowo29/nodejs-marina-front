import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

export async function GET() {
    // const allOrders = await prisma.channel.findMany({});
    // return Response.json(allOrders);
    return Response.json({});
}


export async function POST() {
    // const createChannel = await prisma.channel.create({
    //     data: {
    //         name: 'tokopedia'
    //     }
    // });
    // return Response.json({
    //     channel: createChannel
    // });
    return Response.json({});
}