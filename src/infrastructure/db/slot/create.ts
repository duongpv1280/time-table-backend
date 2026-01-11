import type { Slot } from "@/generated/prisma-client/client";
import type { SlotDayOfWeekPartOfDayLessonNoCompoundUniqueInput, SlotUncheckedCreateInput, SlotUncheckedUpdateInput, SlotWhereUniqueInput } from "@/generated/prisma-client/models";
import { DatabaseClient, type TransactionalPrismaClient } from "@/infrastructure/db/client";
import { inject, injectable, singleton } from "tsyringe";

@injectable()
@singleton()
export class SlotWriter {
  constructor(@inject(DatabaseClient) private client: DatabaseClient) {}

  async create(
    input: SlotUncheckedCreateInput,
    prisma?: TransactionalPrismaClient,
  ): Promise<Slot> {
    const client = prisma ? prisma : this.client.prisma;
    const result = await client.slot.create({ data: input })
    return result
  }

  async createBulk(
    input: SlotUncheckedCreateInput[],
    prisma?: TransactionalPrismaClient,
  ): Promise<number> {
    const client = prisma ? prisma : this.client.prisma;
    const result = await client.slot.createMany({ data: input });

    return result.count;
  }

  async update(
    id: number,
    input: SlotUncheckedUpdateInput,
    prisma?: TransactionalPrismaClient,
  ): Promise<Slot> {
    const client = prisma || this.client.prisma;
    const result = await client.slot.update({ data: input, where: { id }})

    return result;
  }

  async deleteAll(prisma?: TransactionalPrismaClient): Promise<number> {
    console.info('DELETE ALL')
    const client = prisma ? prisma : this.client.prisma;
    const result = await client.slot.deleteMany({});

    console.log('Delete result',result)

    return result.count;
  }
}