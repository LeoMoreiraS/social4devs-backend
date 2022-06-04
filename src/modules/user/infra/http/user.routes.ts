import { Router } from 'express';

import { AuthenticateUserController } from '@user/controllers/authenticate-user-controller';
import { CreateUserController } from '@user/controllers/create-user-controller';

const userRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

userRoutes.post('/', createUserController.handle);
userRoutes.post('/login', authenticateUserController.handle);

export { userRoutes };
