import { AppError } from '@shared/errors/app-error';

import { IEncrypterAdapter } from '../adapters/encrypter';
import { IUserRepository } from '../repositories/user-repository';
import { CreateUserDTO } from './dtos/create-user-dto';

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository // private readonly encrypterAdapter: IEncrypterAdapter
  ) {}

  async execute({
    email,
    name,
    bio,
    nickname,
    password,
    githubAccount,
    specialties,
  }: CreateUserDTO.Params): Promise<CreateUserDTO.Result> {
    const emailAlreadyExists = await this.userRepository.findByEmail({ email });

    if (emailAlreadyExists) {
      throw new AppError(`Email "${email}" already exists`);
    }

    const githubAccountAlreadyExists = await this.userRepository.findByGithub({ githubAccount });

    if (githubAccountAlreadyExists) {
      throw new AppError(`GitHub account "${githubAccount}" already exists`);
    }

    // const encryptedPassword = await this.encrypterAdapter.encrypt(password);

    const user = await this.userRepository.create({
      email,
      name,
      bio,
      nickname,
      // password: encryptedPassword,
      password,
      githubAccount,
      specialties,
    });

    return user;
  }
}
