import { AppError } from '@shared/errors/app-error';

import { UserRepository } from '@user/infra/repositories/user-repository';

import { UserFollow } from '../entities/user-follow';
import { IUserFollowRepository } from '../repositories/user-follow-repository';

export namespace UnfollowUserUseCaseDTO {
  export type Params = {
    emailUserFollower: string;
    emailUserUnfollowed: string;
  };

  export type Result = UserFollow;
}

export class UnfollowUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userFollowRepository: IUserFollowRepository
  ) {}

  async execute({
    emailUserFollower,
    emailUserUnfollowed,
  }: UnfollowUserUseCaseDTO.Params): Promise<UnfollowUserUseCaseDTO.Result> {
    const userFollowed = await this.userRepository.findByEmail({ email: emailUserUnfollowed });

    if (!userFollowed) {
      throw new AppError('User not found');
    }

    const userFollowExists = await this.userFollowRepository.findOne({
      emailUserFollower,
      emailUserFollowed: emailUserUnfollowed,
    });

    if (!userFollowExists) {
      throw new AppError(`User ${emailUserFollower} doesn't follow user ${emailUserUnfollowed}`);
    }

    const deletedUserFollow = await this.userFollowRepository.delete({
      emailUserFollower,
      emailUserUnfollowed,
    });

    return deletedUserFollow;
  }
}
