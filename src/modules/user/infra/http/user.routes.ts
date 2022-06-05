import { Router } from 'express';

import { verifyToken } from '@shared/middlewares/validate-token';

import { AuthenticateUserController } from '@user/controllers/authenticate-user-controller';
import { CreateUserController } from '@user/controllers/create-user-controller';
import { CreateSpecialtyController } from '@user/controllers/create-user-specialty-controller';
import { DeleteSpecialtyController } from '@user/controllers/delete-user-specialty-controller';
import { UpdateUserController } from '@user/controllers/update-user-controller';

const userRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const updateUserController = new UpdateUserController();
const createSpecialtyController = new CreateSpecialtyController();
const deleteSpecialtyController = new DeleteSpecialtyController();

userRoutes.post('/', createUserController.handle);
userRoutes.put('/', verifyToken, updateUserController.handle);
userRoutes.post('/login', authenticateUserController.handle);

userRoutes.post('/specialty', verifyToken, createSpecialtyController.handle);
userRoutes.delete('/specialty', verifyToken, deleteSpecialtyController.handle);

export { userRoutes };
