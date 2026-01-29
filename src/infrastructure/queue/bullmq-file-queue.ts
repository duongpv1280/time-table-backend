// src/infrastructure/queue/bullmq-file-queue.ts
import { Queue, type ConnectionOptions } from 'bullmq';

const connection: ConnectionOptions = {
  host: 'localhost',
  port: 6379, // Adjust to 6380 if needed based on your previous config
};

export class FileQueueService {
  private static instance: Queue;

  public static getQueue(): Queue {
    if (!FileQueueService.instance) {
      FileQueueService.instance = new Queue('processFileQueue', { connection });
    }
    return FileQueueService.instance;
  }
}