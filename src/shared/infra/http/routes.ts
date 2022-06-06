import { Router } from 'express';

import { userRoutes } from '@user/infra/http/user.routes';

import { postRoutes } from '@post/infra/http/post.routes';

import { specialtyRoutes } from '@specialty/infra/http/specialty.routes';

import { followRoutes } from '@follow/infra/http/follow.routes';

import { messageRoutes } from '@message/infra/http/message.routes';

const router = Router();

router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/user/specialty', specialtyRoutes);
router.use('/user/follow', followRoutes);
router.use('/user/message', messageRoutes);

export { router };
