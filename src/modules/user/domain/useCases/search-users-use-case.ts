import { AppError } from '@shared/errors/app-error';

import { User } from '../entities/user';
import { IUserRepository } from '../repositories/user-repository';

export namespace SearchUsersUseCaseDTO {
  export type Params = {
    name?: string;
    nickname?: string;
  };

  export type Result = User[];
}

export class SearchUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    name,
    nickname,
  }: SearchUsersUseCaseDTO.Params): Promise<SearchUsersUseCaseDTO.Result> {
    if (!name && !nickname) {
      throw new AppError('Missing params');
    }

    const users = await this.userRepository.findAllByNameOrNickname({
      name,
      nickname,
    });

    return users;
  }
}
