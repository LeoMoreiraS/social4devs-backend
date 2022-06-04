import { createDatabaseTables } from 'sql/create-database-tables';

import { query } from '@shared/infra/database/connection';

import { app } from './app';

app.listen(3333, async () => {
  await query(createDatabaseTables);
  console.log('Server is running');
});
