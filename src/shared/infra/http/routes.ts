import { Router } from 'express';

import { userRoutes } from '@user/infra/http/user.routes';

import { postRoutes } from '@post/infra/http/post.routes';

const router = Router();

router.use('/user', userRoutes);
router.use('/post', postRoutes);

export { router };
