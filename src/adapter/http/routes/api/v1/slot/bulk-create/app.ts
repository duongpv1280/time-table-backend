import { appContainer } from '@/infrastructure/registry/container';
import type { SlotCreateBulkRequest } from '@/interfaces/slot/bulk-slots-request';
import { CreateBulkSlotsUseCase } from '@/use-cases/slot/bulk-create';
import { Hono } from 'hono';

const app = new Hono();

app.post(
  '/bulk-slots',
  async (c) => {
    const input = await c.req.json<SlotCreateBulkRequest[]>();
    const useCase = appContainer.resolve(CreateBulkSlotsUseCase);
    const result = await useCase.execute(input)
    return c.json(result)
  },
)

export { app };