// src/application/use-cases/upload-file.use-case.ts
import { writeFileSync } from 'fs';
import { join } from 'path';
import { FileQueueService } from '../../infrastructure/queue/bullmq-file-queue';

export class UploadFileUseCase {
  async execute(fileName: string, buffer: Buffer): Promise<{ filePath: string; jobId: string }> {
    // 1. Store file to local memory (disk)
    const uploadDir = join(process.cwd(), 'uploads');
    const filePath = join(uploadDir, `${Date.now()}-${fileName}`);
    
    // Ensure dir exists in a real app
    writeFileSync(filePath, buffer);

    // 2. Push job to BullMQ
    const queue = FileQueueService.getQueue();
    const job = await queue.add('parse-data', { filePath });

    return { filePath, jobId: job.id! };
  }
}