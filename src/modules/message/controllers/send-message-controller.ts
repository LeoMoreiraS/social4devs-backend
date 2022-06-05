import { Response, Request } from 'express';

import { UserRepository } from '@user/infra/repositories/user-repository';

import { SendMessageUseCase } from '@message/domain/useCases/send-message-use-case';
import { MessageRepository } from '@message/infra/repositories/message-repository';

export class SendMessageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { emailUserReceiver, text } = request.body;

    const user = response.locals.decodedToken;

    const userRepository = new UserRepository();
    const messageRepository = new MessageRepository();
    const followUserUseCase = new SendMessageUseCase(userRepository, messageRepository);

    const result = await followUserUseCase.execute({
      emailUserSender: user.email,
      emailUserReceiver,
      text,
    });

    return response.status(201).json(result);
  }
}
