// import { socket } from '@/socket';
// import { sampleQueue } from '@/workers/worker';
// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient();

export async function POST(request: Request) {
    // const req = await request.json();
    
    // try {
    //     await sampleQueue.add('NewChat', req);
    //     // console.log('socket 2 connected: ', socket.connected);
    //     return Response.json({});
    // } catch (err) {
    //     console.log(err);
    //     return Response.json({err}, {status:400})
    // }
}

export async function GET (request:Request) {
//   console.log('request GET');
//   await sampleQueue.add('somejob', request);
  return Response.json({});
}