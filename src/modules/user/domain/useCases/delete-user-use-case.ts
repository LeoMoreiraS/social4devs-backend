import { Client } from 'memjs';

import { AppError } from '@shared/errors/app-error';

import { User } from '../entities/user';
import { IUserRepository } from '../repositories/user-repository';

export namespace DeleteUserUseCaseDTO {
  export type Params = {
    email: string;
  };

  export type Result = User;
}

export class DeleteUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({ email }: DeleteUserUseCaseDTO.Params): Promise<DeleteUserUseCaseDTO.Result> {
    if (!email) {
      throw new AppError('Missing params');
    }

    const deletedUser = await this.userRepository.delete({ email });

    if (!deletedUser) {
      throw new AppError(`Failed to delete user with email '${email}'`);
    }
    const memcached = Client.create();

    memcached.delete(email);

    return deletedUser;
  }
}
