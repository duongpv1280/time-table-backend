import { PrismaClient } from "@/generated/prisma-client/client";
import { injectable, singleton } from "tsyringe";

export type TransactionalPrismaClient = Omit<
  PrismaClient,
  | "$connect"
  | "$disconnect"
  | "$on"
  | "$transaction"
  | "$extends"
>;

@injectable()
@singleton()
export class DatabaseClient {
  private prismaClient: PrismaClient

  constructor() {
    this.prismaClient = new PrismaClient()
  }

  get prisma(): PrismaClient {
    return this.prismaClient;
  }

  async connect(): Promise<void> {
    await this.prismaClient.$connect();
  }

  async executeTransaction<T>(
    fn: (
      prisma: Omit<
        PrismaClient,
        | "$connect"
        | "$disconnect"
        | "$on"
        | "$transaction"
        | "$extends"
      >
    ) => Promise<T>
  ): Promise<T> {
    return await this.prismaClient.$transaction(fn);
  }
}