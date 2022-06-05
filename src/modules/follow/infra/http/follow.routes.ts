import { Router } from 'express';

import { AuthorizationMiddleware } from '@shared/middlewares/authorization-middleware';

import { FollowUserController } from '@follow/controllers/follow-user-controller';
import { UnfollowUserController } from '@follow/controllers/unfollow-user-controller';

const followRoutes = Router();

const authorizationMiddleware = new AuthorizationMiddleware();

const followUserController = new FollowUserController();
const unfollowUserController = new UnfollowUserController();

followRoutes.post('/', authorizationMiddleware.verifyToken, followUserController.handle);
followRoutes.delete('/', authorizationMiddleware.verifyToken, unfollowUserController.handle);

export { followRoutes };
