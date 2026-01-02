import { Hono } from 'hono';
import type { SubjectUpdateWithoutSlotsInput } from '@/generated/prisma-client/models';
import { appContainer } from '@/infrastructure/registry/container';
import UpdateSubjectUseCase from '@/use-cases/subject/update';

const app = new Hono();

app.put(
  '/subjects/:code',
  async (c) => {
    const input = await c.req.json<SubjectUpdateWithoutSlotsInput>();
    const id = await c.req.param('code') as string;
    const useCase = appContainer.resolve(UpdateSubjectUseCase);
    const subject = await useCase.execute(id, input)

    return c.json(subject);
  }
);

export { app };