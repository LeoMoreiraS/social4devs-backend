import { Router } from 'express';

import { AuthorizationMiddleware } from '@shared/middlewares/authorization-middleware';

import { AuthenticateUserController } from '@user/controllers/authenticate-user-controller';
import { CreateUserController } from '@user/controllers/create-user-controller';
import { GetUserInfoController } from '@user/controllers/get-user-info-controller';
import { UpdateUserController } from '@user/controllers/update-user-controller';

const userRoutes = Router();

const authorizationMiddleware = new AuthorizationMiddleware();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const updateUserController = new UpdateUserController();
const getUserInfoController = new GetUserInfoController();

userRoutes.post('/', createUserController.handle);
userRoutes.post('/login', authenticateUserController.handle);
userRoutes.put('/', authorizationMiddleware.verifyToken, updateUserController.handle);
userRoutes.get('/', authorizationMiddleware.verifyToken, getUserInfoController.handle);

export { userRoutes };
