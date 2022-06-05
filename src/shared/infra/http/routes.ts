import { Router } from 'express';

import { userRoutes } from '@user/infra/http/user.routes';

import { specialtyRoutes } from '@specialty/infra/http/specialty.routes';

import { followRoutes } from '@follow/infra/http/follow.routes';

import { messageRoutes } from '@message/infra/http/message.routes';

const router = Router();

router.use('/user', userRoutes);
router.use('/user/specialty', specialtyRoutes);
router.use('/user/follow', followRoutes);
router.use('/user/message', messageRoutes);

export { router };
