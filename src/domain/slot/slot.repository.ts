import type { SlotEntity } from "./slot.entity";
import { SlotUpdateInput } from "./slot.update-input";

export interface ISlotRepository {
    create(input: SlotEntity): Promise<void>;
    get(id: number): Promise<SlotEntity | null>;
    update(id: number, input: SlotUpdateInput): Promise<SlotEntity>;
}
