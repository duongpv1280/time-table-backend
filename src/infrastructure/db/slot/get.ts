import { inject, injectable, singleton } from "tsyringe";
import { DatabaseClient, type TransactionalPrismaClient } from "@/infrastructure/db/client";
import type { Slot } from "@/generated/prisma-client/client";
import { includes } from "zod";

@injectable()
@singleton()
export class SlotReader {
  constructor(@inject(DatabaseClient) private client: DatabaseClient) {}

  async getList(
    prisma?: TransactionalPrismaClient,
  ): Promise<Slot[] | null> {
    const client = prisma ? prisma : this.client.prisma;
    const result = await client.slot.findMany({
      include: {
        subject: true,
      }
    }
    );
    return result
  }
}