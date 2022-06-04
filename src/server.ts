import { createDatabaseTables } from 'sql/create-database-tables';

import { pg } from '@shared/infra/database/connection';

import { app } from './app';

app.listen(3333, async () => {
  console.log(process.env.DB_PASSWORD);
  await pg.connect();
  await pg.query(createDatabaseTables);
  pg.end();
  console.log('Server is running');
});
