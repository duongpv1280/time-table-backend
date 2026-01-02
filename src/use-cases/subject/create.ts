import type { Subject } from "@/generated/prisma-client/client";
import type { SubjectCreateInput } from "@/generated/prisma-client/models";
import { DatabaseClient } from "@/infrastructure/db/client";
import { SubjectWriter } from "@/infrastructure/db/subject/writer";
import type IUseCase from "@/interfaces/useCase";
import { inject, injectable, singleton } from "tsyringe";

@injectable()
@singleton()
export default class CreateSubjectUseCase implements IUseCase<Subject> {
  constructor(
    @inject(DatabaseClient) private dbClient: DatabaseClient,
    @inject(SubjectWriter) private writer: SubjectWriter,
  ) {}

  async execute(input: SubjectCreateInput): Promise<Subject> {
    try {
      return await this.dbClient.executeTransaction(async (prisma) => {
        console.log(input);
        return await this.writer.create(input, prisma);
      })
    } catch (err) {
      console.error(err);
      throw err
    };
  }
}