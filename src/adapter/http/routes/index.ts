import { Hono } from 'hono';
import { app as timeTableList } from './api/v1/time-table/get-list/app'
import { app as createSubjectApp } from './api/v1/subject/create/app'
import { app as getSubjectsApp } from './api/v1/subject/get-list/app'
import { app as createBulkSlotsApp } from './api/v1/slot/bulk-create/app'
import { app as deleteAllSlotsApp } from './api/v1/slot/delete-all/app'
import { app as updateSubject } from './api/v1/subject/update/app'

export const createRoutes = (app: Hono) => {
  app.route('api/v1/', timeTableList);
  app.route('api/v1/', createSubjectApp);
  app.route('api/v1/', getSubjectsApp);
  app.route('api/v1/', createBulkSlotsApp);
  app.route('api/v1/', deleteAllSlotsApp);
  app.route('api/v1/', updateSubject);

  return app;
}