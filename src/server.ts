import { createDatabaseTables } from 'sql/create-database-tables';

import { pgQuery } from '@shared/infra/database/connection';

import { app } from './app';

app.listen(3333, () => {
  pgQuery.query(createDatabaseTables);
  console.log('Server is running');
});
