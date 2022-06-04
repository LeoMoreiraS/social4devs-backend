import { createDatabaseTables } from 'sql/create-database-tables';

import { pg } from '@shared/infra/database/connection';

import { app } from './app';

app.listen(3333, () => {
  pg.query(createDatabaseTables);
  console.log('Server is running');
});
