import { serve } from '@hono/node-server'
import { createApp } from './app';
import config from '@/config/config';

const app = createApp()

const server = serve({
  fetch: app.fetch,
  port: config.port
})
