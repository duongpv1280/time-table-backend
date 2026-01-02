import { inject, injectable, singleton } from "tsyringe";
import type IUseCase from "../../interfaces/useCase";
import { SlotReader } from "@/infrastructure/db/slot/get";
import { DatabaseClient } from "@/infrastructure/db/client";
import type { Slot } from "@/generated/prisma-client/client";

@injectable()
@singleton()
export class GetListSlotsUseCase implements IUseCase<Slot[]> {
  constructor(
    @inject(SlotReader) private reader: SlotReader,
    @inject(DatabaseClient) private dbClient: DatabaseClient,
  ) {}

  async execute(): Promise<Slot[]> {
    const result = await this.reader.getList(this.dbClient.prisma);
    return result ?? [];
  }

}