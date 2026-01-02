import { appContainer } from '@/infrastructure/registry/container';
import { GetListSlotsUseCase } from '@/use-cases/slot/get-list';
import { Hono, type Context } from 'hono';

const app = new Hono();

app.get(
  '/time-table',
  async (c: Context) => {
    const slotUseCase = appContainer.resolve(GetListSlotsUseCase);
    const slots = await slotUseCase.execute();
    return c.json(slots)
  }
);

export { app };