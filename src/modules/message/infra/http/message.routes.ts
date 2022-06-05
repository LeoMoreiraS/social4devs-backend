import { Router } from 'express';

import { AuthorizationMiddleware } from '@shared/middlewares/authorization-middleware';

import { SendMessageController } from '@message/controllers/send-message-controller';

const messageRoutes = Router();

const authorizationMiddleware = new AuthorizationMiddleware();

const sendMessageController = new SendMessageController();

messageRoutes.post('/', authorizationMiddleware.verifyToken, sendMessageController.handle);

export { messageRoutes };
