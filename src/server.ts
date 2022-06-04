import { createDatabaseTables } from 'sql/create-database-tables';

import { pgQuery } from '@shared/infra/database/connection';

import { app } from './app';

app.listen(3333, async () => {
  console.log(process.env.DB_PASSWORD);
  await pgQuery.connect();
  await pgQuery.query(createDatabaseTables);
  pgQuery.end();
  console.log('Server is running');
});
