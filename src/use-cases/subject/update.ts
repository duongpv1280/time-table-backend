import type { Subject } from "@/generated/prisma-client/client";
import type { SubjectUpdateWithoutSlotsInput } from "@/generated/prisma-client/models";
import { DatabaseClient } from "@/infrastructure/db/client";
import { SubjectReader } from "@/infrastructure/db/subject/reader";
import { SubjectWriter } from "@/infrastructure/db/subject/writer";
import type IUseCase from "@/interfaces/useCase";
import { inject, injectable, singleton } from "tsyringe";

@injectable()
@singleton()
export default class UpdateSubjectUseCase implements IUseCase<Subject> {
  constructor(
    @inject(DatabaseClient) private dbClient: DatabaseClient,
    @inject(SubjectReader) private reader: SubjectReader,
    @inject(SubjectWriter) private writer: SubjectWriter,
  ) {}

  async execute(id: string, input: SubjectUpdateWithoutSlotsInput): Promise<Subject> {
    const subject = await this.reader.getDetail(id);

    if (!subject) {
      throw new Error('SubjectNotFound');
    }

    try {
      return await this.dbClient.executeTransaction(async (prisma) => {
        return await this.writer.update(id, input, prisma);
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}