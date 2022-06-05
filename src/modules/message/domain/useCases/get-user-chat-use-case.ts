import { AppError } from '@shared/errors/app-error';

import { UserRepository } from '@user/infra/repositories/user-repository';

import { Message } from '../entities/message';
import { IMessageRepository } from '../repositories/message-repository';

export namespace GetUserChatUseCaseDTO {
  export type Params = {
    emailUserSender: string;
    emailUserReceiver: string;
  };

  export type Result = Message[];
}

export class GetUserChatUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly messageRepository: IMessageRepository
  ) {}

  async execute({
    emailUserSender,
    emailUserReceiver,
  }: GetUserChatUseCaseDTO.Params): Promise<GetUserChatUseCaseDTO.Result> {
    const userReceiver = await this.userRepository.findByEmail({ email: emailUserReceiver });

    if (!userReceiver) {
      throw new AppError('User receiver not found');
    }

    const userChat = await this.messageRepository.getUserChat({
      emailUserSender,
      emailUserReceiver,
    });

    return userChat;
  }
}
