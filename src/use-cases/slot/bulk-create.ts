import type { Subject } from "@/generated/prisma-client/client";
import type { SlotCreateInput, SlotUncheckedCreateInput } from "@/generated/prisma-client/models";
import { DatabaseClient } from "@/infrastructure/db/client";
import { SlotWriter } from "@/infrastructure/db/slot/create";
import { SlotReader } from "@/infrastructure/db/slot/get";
import { SubjectReader } from "@/infrastructure/db/subject/reader";
import type { SlotCreateBulkRequest } from "@/interfaces/slot/bulk-slots-request";
import type IUseCase from "@/interfaces/useCase";
import { inject, injectable, singleton } from "tsyringe";

@injectable()
@singleton()
export class CreateBulkSlotsUseCase implements IUseCase<string> {
  constructor(
    @inject(SubjectReader) private subjectReader: SubjectReader,
    @inject(SlotReader) private slotReader: SlotReader,
    @inject(SlotWriter) private slotWriter: SlotWriter,
    @inject(DatabaseClient) private dbClient: DatabaseClient,
  ) {}

  async execute(input: SlotCreateBulkRequest[]): Promise<string> {
    const subjects = await this.subjectReader.getList();
    const subJectsByCode: Record<string, Subject> = {};
    subjects.forEach((s) => {
      if (subJectsByCode[s.code] == undefined) {
        subJectsByCode[s.code] = s;
      }
    });

    const slots = await this.slotReader.getList();
    if (!slots || slots?.length > 0) {
      return 'failed';
    }

    let responseMessage = 'success';

    try {
      const result = await this.dbClient.executeTransaction(async (prisma) => {
        let slotId = 1;
        const creatingSlots: SlotUncheckedCreateInput[] = [];
        // Start parsing from input to slots' data
        input.forEach((dayData) => {
          const { dayOfWeek } = dayData;
          dayData.sections.forEach((section) => {
            const { partOfDay } = section;
            section.slots.map((s) => {
              const slot: SlotUncheckedCreateInput = {
                id: slotId,
                dayOfWeek,
                partOfDay,
                subjectCode: s.code || null,
                lessonNo: s.lessonNo
              };
              slotId ++;
              creatingSlots.push(slot);
            }) || [];
          });
        });

        return await this.slotWriter.createBulk(creatingSlots, prisma);
      });

      responseMessage = `Created ${result} items successfully.`;
    } catch (err) {
      console.error(err);
      throw err
    }

    return responseMessage;
  }
}
