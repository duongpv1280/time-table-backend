import { Job } from "bullmq";

export default async function (job: Job) {
  await job.log('Start processing job');
  console.log('Doing somethig useful...', job.id, job.data);
}