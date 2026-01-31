import { SlotEntity } from "@/domain/slot/slot.entity";
import type { ISlotRepository } from "@/domain/slot/slot.repository";
import { PrismaClient, type Slot } from "@/generated/prisma-client/client";
import { SlotMapper } from "./slot.mapper";
import type { SlotUncheckedCreateInput, SlotUncheckedUpdateInput } from "@/generated/prisma-client/models";
import type { SlotUpdateInput } from "@/domain/slot/slot.update-input";

export class SlotRepository implements ISlotRepository {
    private prisma = new PrismaClient;

    async create(input: SlotEntity): Promise<void> {
      const data = SlotMapper.toPersistence(input);
      await this.prisma.slot.create({
        data: {
          ...data as SlotUncheckedCreateInput,
        },
      });
    }

    async get(id: number): Promise<SlotEntity | null> {
      const result = await this.prisma.slot.findFirst({
        where: {
          id,
        }
      }) as Slot;
      return result ? SlotMapper.toDomain(result) : null;
    }

    async update(
      id: number,
      input: SlotUpdateInput,
    ): Promise<SlotEntity> {
      const result = await this.prisma.slot.update(
        {
          where: {
            id,
          },
          data: {
            dayOfWeek: input.dayOfWeek,
            partOfDay: input.partOfDay,
            lessonNo: input.lessonNo,
            subjectCode: input.subjectCode,
          } as SlotUncheckedUpdateInput
        }
      );

      return SlotMapper.toDomain(result)
    }
}