import { Router } from 'express';

import { AuthorizationMiddleware } from '@shared/middlewares/authorization-middleware';

import { AuthenticateUserController } from '@user/controllers/authenticate-user-controller';
import { CreateUserController } from '@user/controllers/create-user-controller';
import { FindUserWithJoinsController } from '@user/controllers/find-user-controller';
import { UpdateUserController } from '@user/controllers/update-user-controller';

const userRoutes = Router();

const authorizationMiddleware = new AuthorizationMiddleware();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const updateUserController = new UpdateUserController();
const findUserWithJoinsController = new FindUserWithJoinsController();

userRoutes.post('/', createUserController.handle);
userRoutes.post('/login', authenticateUserController.handle);
userRoutes.put('/', authorizationMiddleware.verifyToken, updateUserController.handle);
userRoutes.get('/', authorizationMiddleware.verifyToken, findUserWithJoinsController.handle);

export { userRoutes };
