import { Router } from 'express';

import { verifyToken } from '@shared/middlewares/validate-token';

import { AuthenticateUserController } from '@user/controllers/authenticate-user-controller';
import { CreateUserController } from '@user/controllers/create-user-controller';
import { UpdateUserController } from '@user/controllers/update-user-controller';

const userRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const updateUserController = new UpdateUserController();

userRoutes.post('/', createUserController.handle);
userRoutes.put('/', verifyToken, updateUserController.handle);
userRoutes.post('/login', authenticateUserController.handle);

export { userRoutes };
