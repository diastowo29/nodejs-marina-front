// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

export async function GET() {
    // const allStores = await prisma.store.findMany({
    //     include: {
    //         channel: true,
    //         user:true
    //     }
    // });
    // return Response.json(allStores);
    return Response.json({});

}

export async function PUT(request:Request) {
    // const req = await request.json();
    // const store = await prisma.store.upsert({
    //     where: {
    //         identifier: req.identifier
    //     },
    //     create: {
    //         name: req.name,
    //         identifier: req.identifier,
    //         channel: {
    //             connect: {
    //                 name: req.channel
    //             }
    //         },
    //         status: req.status,
    //         user: {
    //             connect: {
    //                 email: 'diastowo@gmail.com'
    //             }
    //         }
    //     },
    //     update: {
    //         status: req.status
    //     }
    // })
    // return Response.json(store);
    return Response.json({});

}


export async function POST(request:Request) {
    // const req = await request.json();
    // const createStore = await prisma.store.create({
    //     data: {
    //         name: req.name,
    //         identifier: req.identifier,
    //         channel: {
    //             connect: {
    //                 name: req.channel
    //             }
    //         },
    //         status: req.status,
    //         user: {
    //             connect: {
    //                 email: 'diastowo@gmail.com'
    //             }
    //         }
    //     }
    // });
    // return Response.json({
    //     channel: createStore
    // });
    return Response.json({})
}