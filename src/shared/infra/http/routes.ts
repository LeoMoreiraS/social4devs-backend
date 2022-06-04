import { Router } from 'express';

import { userRoutes } from '@user/infra/http/user.routes';

const router = Router();

router.use('/user', userRoutes);

export { router };
