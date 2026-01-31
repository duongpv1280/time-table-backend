export class SlotEntity {
    constructor(
        public readonly id: number,
        public readonly dayOfWeek: number,
        public readonly partOfDay: number,
        public readonly lessonNo: number,
        public readonly subjectCode: string,
    ) {}
}