import { Worker, Queue } from 'bullmq';
import Redis from 'ioredis';
import io from 'socket.io-client';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const connection = new Redis(REDIS_URL, {maxRetriesPerRequest:null});
const socket = io('http://localhost:3000');

export const sampleQueue = new Queue('sampleQueue', {
    connection,
    defaultJobOptions: {
        attempts: 2,
        backoff: {
            type: 'exponential',
            delay: 5000,
        },
    },
  });

const worker = new Worker(
  'sampleQueue', // this is the queue name, the first string parameter we provided for Queue()
   async (job) => {
    const data = job?.data;
    if (job.name == 'NewChat') {
        processChat(data);
    }
    console.log('Task executed successfully');
  },
  {
    connection,
    concurrency: 5,
    removeOnComplete: { count: 1000 },
    removeOnFail: { count: 5000 },
  }
);

async function processChat (chatData:any) {
    // console.log('chat new');
    const mathRandom = Math.floor(Math.random() * 90000) + 10000
    const chatMessage = chatData.message;
    const chatMessageId = `${chatData.msg_id}-${mathRandom}`;
    const shopId = chatData.shop_id;
    const chatUsername = chatData.full_name;
    const chatUserId = chatData.user_id;
    const chatId = `${chatData.shop_id}-${chatUserId}`;
    console.log('socket 1 connected: ', socket.connected);
    socket.emit('message1', chatData);
    const newChat = await prisma.omnichat.upsert({
        where: {
            origin_id: chatId,
        },
        update: {
            last_message: chatMessage,
            updatedAt: new Date(),
            messages: {
                create: {
                    line_text: chatMessage,
                    author: 'end-user',
                    origin_id: chatMessageId.toString(),
                }
            }
        },
        create: {
            origin_id: chatId,
            last_message: chatMessage,
            omnichat_user: {
                connectOrCreate: {
                    create: {
                        username: chatUsername,
                        origin_id: chatUserId.toString(),
                        thumbnailUrl: chatData.thumbnail
                    },
                    where: {
                        origin_id: chatUserId.toString()
                    }
                }
            },
            messages: {
                create: {
                    line_text: chatMessage,
                    author: 'end-user',
                    origin_id: chatMessageId.toString(),
                }
            },
            store: {
                connect: {
                    origin_id: shopId.toString()
                }
            }
        }
    });
    // console.log(newChat);
}

export default worker;
