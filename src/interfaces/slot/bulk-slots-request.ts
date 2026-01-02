interface ISlotCreateBulkSlotSubjectRequest {
  lessonNo: number;
  code?: string;
}

interface ISection {
  partOfDay: number;
  slots: ISlotCreateBulkSlotSubjectRequest[];
}

export default interface ISlotCreateBulkRequest {
  dayOfWeek: number;
  sections: ISection[];
}

export type SlotCreateBulkRequest = ISlotCreateBulkRequest;