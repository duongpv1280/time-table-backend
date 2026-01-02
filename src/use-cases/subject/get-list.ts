import type { Subject } from "@/generated/prisma-client/client";
import { DatabaseClient } from "@/infrastructure/db/client";
import { SubjectReader } from "@/infrastructure/db/subject/reader";
import type IUseCase from "@/interfaces/useCase";
import { inject, injectable, singleton } from "tsyringe";

@injectable()
@singleton()
export class GetSubjectsUseCase implements IUseCase<Subject[]> {
  constructor(
    @inject(SubjectReader) private reader: SubjectReader,
  ) {}

  async execute(): Promise<Subject[]> {
    return await this.reader.getList();
  }
}