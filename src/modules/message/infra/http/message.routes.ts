import { Router } from 'express';

import { AuthorizationMiddleware } from '@shared/middlewares/authorization-middleware';

import { GetUserChatController } from '@message/controllers/get-user-chat-controller';
import { SendMessageController } from '@message/controllers/send-message-controller';

const messageRoutes = Router();

const authorizationMiddleware = new AuthorizationMiddleware();

const sendMessageController = new SendMessageController();
const getUserChatController = new GetUserChatController();

messageRoutes.post('/', authorizationMiddleware.verifyToken, sendMessageController.handle);
messageRoutes.get('/chat', authorizationMiddleware.verifyToken, getUserChatController.handle);

export { messageRoutes };
