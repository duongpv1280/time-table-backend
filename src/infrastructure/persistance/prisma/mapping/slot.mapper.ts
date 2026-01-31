import { SlotEntity } from "@/domain/slot/slot.entity";
import type { Slot } from "@/generated/prisma-client/client";

export class SlotMapper {
  // Convert Prisma Record to Domain Entity
  static toDomain(raw: Slot): SlotEntity {
    return new SlotEntity(
      raw.id,
      raw.dayOfWeek,
      raw.partOfDay,
      raw.lessonNo,
      raw.subjectCode as string
    );
  }

  // Convert Domain Entity to Prisma Data (for saving)
  static toPersistence(entity: SlotEntity): Partial<Slot> {
    return {
      id: entity.id,
      dayOfWeek: entity.dayOfWeek,
      partOfDay: entity.partOfDay,
      lessonNo: entity.lessonNo,
      subjectCode: entity.subjectCode,
    };
  }
}
