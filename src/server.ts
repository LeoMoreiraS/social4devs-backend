import { query } from '@shared/infra/database/connection';
import { migrations } from '@shared/infra/database/migrations';

import { app } from './app';

app.listen(process.env.PORT || 3333, async () => {
  await query(migrations);
  console.log('Server is running');
});
