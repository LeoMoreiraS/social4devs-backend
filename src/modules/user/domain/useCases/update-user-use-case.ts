import { JwtPayload } from 'jsonwebtoken';

import { AppError } from '@shared/errors/app-error';

import { IEncrypterAdapter } from '../adapters/encrypter';
import { User } from '../entities/user';
import { IUserRepository } from '../repositories/user-repository';

export namespace UpdateUserUseCaseDTO {
  export type Params = {
    user: JwtPayload;
    email?: string;
    name?: string;
    bio?: string;
    nickname?: string;
    password?: string;
    githubAccount?: string;
  };

  export type Result = User;
}

export class UpdateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly encrypterAdapter: IEncrypterAdapter
  ) {}

  async execute({
    user,
    email,
    name,
    bio,
    nickname,
    password,
    githubAccount,
  }: UpdateUserUseCaseDTO.Params): Promise<UpdateUserUseCaseDTO.Result> {
    if (email) {
      const emailAlreadyExists = await this.userRepository.findByEmail({ email });

      if (emailAlreadyExists) {
        throw new AppError(`Email '${email}' already exists`);
      }
    }

    if (githubAccount) {
      const githubAccountAlreadyExists = await this.userRepository.findByGithub({ githubAccount });

      if (githubAccountAlreadyExists) {
        throw new AppError(`GitHub account '${githubAccount}' already exists`);
      }
    }

    let encryptedPassword = password;
    if (password) {
      encryptedPassword = await this.encrypterAdapter.encrypt(password);
    }

    const updatedUser = await this.userRepository.update({
      currentEmail: user.email,
      email,
      name,
      bio,
      nickname,
      password: encryptedPassword,
      githubAccount,
    });

    return updatedUser;
  }
}
