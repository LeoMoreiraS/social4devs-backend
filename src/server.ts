import { query } from '@shared/infra/database/connection';
import { createDatabaseTables } from '@shared/infra/database/create-database-tables';

import { app } from './app';

app.listen(3333, async () => {
  await query(createDatabaseTables);
  console.log('Server is running');
});
