import { Client } from 'memjs';

import { AppError } from '@shared/errors/app-error';

import { Specialty } from '@specialty/domain/entities/specialty';
import { ISpecialtyRepository } from '@specialty/domain/repositories/specialty-repository';

import { IUserFollowRepository } from '@follow/domain/repositories/user-follow-repository';

import { User } from '../entities/user';
import { IUserRepository } from '../repositories/user-repository';

export namespace GetUserInfoUseCaseDTO {
  export type Params = {
    email: string;
  };

  export type Result = {
    email: string;
    name: string;
    bio: string;
    nickname: string;
    githubAccount: string;
    specialties: Specialty[] | null;
    followers: User[] | null;
    follows: User[] | null;
  };
}

export class GetUserInfoUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly specialtyRepository: ISpecialtyRepository,
    private readonly userFollowRepository: IUserFollowRepository
  ) {}

  async execute({ email }: GetUserInfoUseCaseDTO.Params): Promise<GetUserInfoUseCaseDTO.Result> {
    if (!email) {
      throw new AppError('Missing param');
    }
    const memcached = Client.create();

    const userIsCached = await memcached.get(email);

    console.log(userIsCached);

    if (userIsCached.value) {
      const buff = userIsCached.value.toString();
      console.log('CACHE DE USERINFO', JSON.parse(buff));
      return JSON.parse(buff);
    }

    const user = await this.userRepository.findByEmail({ email });

    if (!user) {
      throw new AppError('User not found');
    }

    const specialties = await this.specialtyRepository.findUserSpecialties({ email });

    const userFollowers = await this.userFollowRepository.findFollowers({ email });

    const userFollows = await this.userFollowRepository.findFollows({ email });

    const userInfo = {
      ...user,
      specialties,
      followers: userFollowers,
      follows: userFollows,
    };
    console.log('SETANDO CACHE DE USERINFO', userInfo);
    memcached.set(email, JSON.stringify(userInfo), {});

    return userInfo;
  }
}
