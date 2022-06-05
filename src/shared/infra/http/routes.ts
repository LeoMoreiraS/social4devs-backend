import { Router } from 'express';

import { userRoutes } from '@user/infra/http/user.routes';

import { specialtyRoutes } from '@specialty/infra/http/specialty.routes';

import { followRoutes } from '@follow/infra/http/follow.routes';

const router = Router();

router.use('/user', userRoutes);
router.use('/user/specialty', specialtyRoutes);
router.use('/user/follow', followRoutes);

export { router };
