// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient()

export async function GET(request:Request, { params } : any) {
    // const comments = await prisma.omnichat_line.findMany({
    //     where: {
    //         omnichatId: Number.parseInt(params.chat)
    //     }
    // });
    // return Response.json(comments);
    return Response.json({});
}