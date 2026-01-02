import type { Subject } from "@/generated/prisma-client/client";
import type { SubjectCreateInput, SubjectUpdateWithoutSlotsInput } from "@/generated/prisma-client/models";
import { DatabaseClient, type TransactionalPrismaClient } from "@/infrastructure/db/client";
import { inject, injectable, singleton } from "tsyringe";

@injectable()
@singleton()
export class SubjectWriter {
  constructor(@inject(DatabaseClient) private client: DatabaseClient) {}

  async create(
    input: SubjectCreateInput,
    prisma?: TransactionalPrismaClient,
  ): Promise<Subject> {
    const client = prisma ?? this.client.prisma;
    const result = await client.subject.create({ data: input });

    return result;
  }

  async update(
    code: string,
    input: SubjectUpdateWithoutSlotsInput,
    prisma?: TransactionalPrismaClient,
  ): Promise<Subject> {
    console.log(input);
    const client = prisma ?? this.client.prisma;
    const result = await client.subject.update({
      data: {
        ...input,
      },
      where: {
        code,
      }
    });

    return result;
  }
}