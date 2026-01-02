import { DatabaseClient } from "@/infrastructure/db/client";
import { SlotWriter } from "@/infrastructure/db/slot/create";
import type IUseCase from "@/interfaces/useCase";
import { inject, injectable, singleton } from "tsyringe";

@injectable()
@singleton()
export class SlotDeleteAllUseCase implements IUseCase<number> {
  constructor(
    @inject(SlotWriter) private writer: SlotWriter,
    @inject(DatabaseClient) private dbClient: DatabaseClient,
  ) {}

  async execute(...args: unknown[]): Promise<number> {
    try {
      return await this.dbClient.executeTransaction(async (prisma) => {
        return this.writer.deleteAll(prisma);
      });
    } catch (err) {
      console.error(err);
      throw err
    }
  }
}