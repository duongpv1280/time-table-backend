import type { SubjectCreateInput } from '@/generated/prisma-client/models';
import { appContainer } from '@/infrastructure/registry/container';
import CreateSubjectUseCase from '@/use-cases/subject/create';
import { Hono } from 'hono';

const app = new Hono();

app.post(
  '/subjects',
  async (c) => {
    const input = await c.req.json<SubjectCreateInput>();
    const subjectUseCase = appContainer.resolve(CreateSubjectUseCase);
    const slots = await subjectUseCase.execute(input);
    return c.json(slots);
  }
);

export { app };