import { Router } from 'express';

import { AuthorizationMiddleware } from '@shared/middlewares/authorization-middleware';

import { CreateSpecialtyController } from '@specialty/controllers/create-user-specialty-controller';
import { DeleteSpecialtyController } from '@specialty/controllers/delete-user-specialty-controller';

const specialtyRoutes = Router();

const authorizationMiddleware = new AuthorizationMiddleware();

const createSpecialtyController = new CreateSpecialtyController();
const deleteSpecialtyController = new DeleteSpecialtyController();

specialtyRoutes.post('/', authorizationMiddleware.verifyToken, createSpecialtyController.handle);
specialtyRoutes.delete('/', authorizationMiddleware.verifyToken, deleteSpecialtyController.handle);

export { specialtyRoutes };
