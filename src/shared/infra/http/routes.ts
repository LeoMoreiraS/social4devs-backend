import { Router } from 'express';

import { userRoutes } from '@user/infra/http/user.routes';

import { specialtyRoutes } from '@specialty/infra/http/specialty.routes';

const router = Router();

router.use('/user', userRoutes);
router.use('/specialty', specialtyRoutes);

export { router };
