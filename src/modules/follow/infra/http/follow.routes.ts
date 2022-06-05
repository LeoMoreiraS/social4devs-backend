import { Router } from 'express';

import { AuthorizationMiddleware } from '@shared/middlewares/authorization-middleware';

import { FollowUserController } from '@follow/controllers/follow-user-controller';

const followRoutes = Router();

const authorizationMiddleware = new AuthorizationMiddleware();

const followUserController = new FollowUserController();

followRoutes.post('/', authorizationMiddleware.verifyToken, followUserController.handle);

export { followRoutes };
