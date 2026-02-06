import type { JobCreateInput, JobEntity, JobUpdateInput } from "./job.entity";

export interface IJobRepository {
  create(input: JobCreateInput): Promise<JobEntity>;
  update(input: JobUpdateInput): Promise<JobEntity>;
}