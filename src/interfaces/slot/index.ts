import type { Slot } from "@/generated/prisma-client/client"

export default interface ISlot {
  getList(params: Partial<Slot>): Promise<ISlot[]>
  update(id: number, params: Partial<Slot>): Promise<ISlot>
  create(params: Partial<Slot>): Promise<ISlot>
}