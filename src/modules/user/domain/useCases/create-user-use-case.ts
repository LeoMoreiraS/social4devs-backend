import { AppError } from '@shared/errors/app-error';

import { IEncrypterAdapter } from '../adapters/encrypter-adapter';
import { User } from '../entities/user';
import { ISpecialtyRepository } from '../repositories/specialty-repository';
import { IUserRepository } from '../repositories/user-repository';

export namespace CreateUserUseCaseDTO {
  export type Params = {
    email: string;
    name: string;
    bio: string;
    nickname: string;
    password: string;
    githubAccount: string;
    specialties: string[];
  };

  export type Result = User;
}

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly specialtyRepository: ISpecialtyRepository,
    private readonly encrypterAdapter: IEncrypterAdapter
  ) {}

  async execute({
    email,
    name,
    bio,
    nickname,
    password,
    githubAccount,
    specialties,
  }: CreateUserUseCaseDTO.Params): Promise<CreateUserUseCaseDTO.Result> {
    if (!email || !name || !nickname || !password || !githubAccount) {
      throw new AppError('Missing params');
    }

    const emailAlreadyExists = await this.userRepository.findByEmail({ email });

    if (emailAlreadyExists) {
      throw new AppError(`Email '${email}' already exists`);
    }

    const githubAccountAlreadyExists = await this.userRepository.findByGithub({ githubAccount });

    if (githubAccountAlreadyExists) {
      throw new AppError(`GitHub account '${githubAccount}' already exists`);
    }

    const encryptedPassword = await this.encrypterAdapter.encrypt(password);

    const user = await this.userRepository.create({
      email,
      name,
      bio,
      nickname,
      password: encryptedPassword,
      githubAccount,
    });

    const createSpecialtiesPromises = specialties.map(async (specialty) => {
      const createdSpecialty = await this.specialtyRepository.create({
        userEmail: email,
        name: specialty,
      });

      return createdSpecialty;
    });

    const createdSpecialties = await Promise.all(createSpecialtiesPromises);

    const createdUser = {
      ...user,
      specialties: createdSpecialties,
    };

    return createdUser;
  }
}
