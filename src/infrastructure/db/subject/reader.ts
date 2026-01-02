import type { Subject } from "@/generated/prisma-client/client";
import { DatabaseClient } from "@/infrastructure/db/client";
import { inject, injectable, singleton } from "tsyringe";

@injectable()
@singleton()
export class SubjectReader {
  constructor(
    @inject(DatabaseClient) private dbClient: DatabaseClient,
  ) {}

  async getList(): Promise<Subject[]> {
    return await this.dbClient.prisma.subject.findMany();
  }

  async getDetail(code: string): Promise<Subject | null> {
    return await this.dbClient.prisma.subject.findFirst({
      where: { code }
    })
  }
}