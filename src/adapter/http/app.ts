import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { createRoutes } from './routes';

export const createApp = (config?: { ignoreAuthPaths?: string[] }) => {
  const app = new Hono()

  app.use('*', cors({
    origin: '*',
  }))
  const routes = createRoutes(app);
  app.route('/', routes);

  return app;
}