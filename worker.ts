import { Worker } from 'bullmq';
import Redis from 'ioredis';

const redisConnection = new Redis();

const worker = new Worker('jobQueue', async job => {
  console.log('Processing job:', job.data);
  // Process the job
}, { connection: redisConnection });

export default worker;