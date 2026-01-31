export class SlotUpdateInput {
  constructor(
    public readonly dayOfWeek: number,
    public readonly partOfDay: number,
    public readonly lessonNo: number,
    public readonly subjectCode?: string| null,
  ) {}
}