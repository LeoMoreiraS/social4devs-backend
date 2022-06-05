import { Response, Request } from 'express';

import { AppError } from '@shared/errors/app-error';

import { UserRepository } from '@user/infra/repositories/user-repository';

import { GetUserChatUseCase } from '@message/domain/useCases/get-user-chat-use-case';
import { MessageRepository } from '@message/infra/repositories/message-repository';

export class GetUserChatController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { receiver } = request.headers;

    if (!receiver) {
      throw new AppError('Receiver is required');
    }

    const user = response.locals.decodedToken;

    const userRepository = new UserRepository();
    const messageRepository = new MessageRepository();
    const getUserChatUseCase = new GetUserChatUseCase(userRepository, messageRepository);

    const result = await getUserChatUseCase.execute({
      emailUserSender: user.email,
      emailUserReceiver: receiver.toString(),
    });

    return response.status(200).json(result);
  }
}
