import { AppError } from '@shared/errors/app-error';

import { UserRepository } from '@user/infra/repositories/user-repository';

import { UserFollow } from '../entities/user-follow';
import { IUserFollowRepository } from '../repositories/user-follow-repository';

export namespace FollowUserUseCaseDTO {
  export type Params = {
    emailUserFollower: string;
    emailUserFollowed: string;
  };

  export type Result = UserFollow;
}

export class FollowUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userFollowRepository: IUserFollowRepository
  ) {}

  async execute({
    emailUserFollower,
    emailUserFollowed,
  }: FollowUserUseCaseDTO.Params): Promise<FollowUserUseCaseDTO.Result> {
    const userFollowed = await this.userRepository.findByEmail({ email: emailUserFollowed });

    if (!userFollowed) {
      throw new AppError('User not found');
    }

    const userFollowExists = await this.userFollowRepository.findOne({
      emailUserFollowed,
      emailUserFollower,
    });

    if (userFollowExists) {
      throw new AppError(`User ${emailUserFollower} already follows user ${emailUserFollowed}`);
    }

    const userFollow = await this.userFollowRepository.create({
      emailUserFollowed,
      emailUserFollower,
    });

    return userFollow;
  }
}
