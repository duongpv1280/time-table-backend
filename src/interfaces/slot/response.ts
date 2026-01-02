import type ISubjectResponse from "../subject/response.js";

export default interface ISlotResponse {
  id: number;
  dayOfWeek: number;
  partOfDay: number;
  classNo: number;
  subject?: ISubjectResponse;
}