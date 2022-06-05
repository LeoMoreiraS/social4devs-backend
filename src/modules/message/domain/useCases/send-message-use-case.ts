import { AppError } from '@shared/errors/app-error';

import { UserRepository } from '@user/infra/repositories/user-repository';

import { Message } from '../entities/message';
import { IMessageRepository } from '../repositories/message-repository';

export namespace SendMessageUseCaseDTO {
  export type Params = {
    emailUserSender: string;
    emailUserReceiver: string;
    text: string;
  };

  export type Result = Message;
}

export class SendMessageUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly messageRepository: IMessageRepository
  ) {}

  async execute({
    emailUserSender,
    emailUserReceiver,
    text,
  }: SendMessageUseCaseDTO.Params): Promise<SendMessageUseCaseDTO.Result> {
    if (emailUserSender === emailUserReceiver) {
      throw new AppError('User receiver is the same user sender');
    }

    const userReceiver = await this.userRepository.findByEmail({ email: emailUserReceiver });

    if (!userReceiver) {
      throw new AppError('User receiver not found');
    }

    const createdUserFollow = await this.messageRepository.create({
      emailUserSender,
      emailUserReceiver,
      text,
    });

    return createdUserFollow;
  }
}
