import { appContainer } from '@/infrastructure/registry/container';
import { SlotDeleteAllUseCase } from '@/use-cases/slot/delete-all';
import { Hono } from 'hono';

const app = new Hono();

app.post(
  'slots/delete-all',
  async (c) => {
    const slotUseCase = appContainer.resolve(SlotDeleteAllUseCase);
    const result = await slotUseCase.execute();

    return c.json({ message: `Deleted ${result} successfully`});
  }
);

export { app };