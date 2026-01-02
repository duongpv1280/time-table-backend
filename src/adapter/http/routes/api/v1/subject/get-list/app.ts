import { appContainer } from '@/infrastructure/registry/container';
import { GetSubjectsUseCase } from '@/use-cases/subject/get-list';
import { Hono } from 'hono';

const app = new Hono();

app.get(
  '/subjects',
  async (c) => {
    const subjectUseCase = appContainer.resolve(GetSubjectsUseCase);
    const slots = await subjectUseCase.execute();
    return c.json(slots)
  }
);

export { app };