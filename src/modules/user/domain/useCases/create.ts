import { AlreadyExistsError } from '@shared/errors/already-exists';

import { IEncrypterAdapter } from '../adapters/encrypter';
import { ICreateUserRepository } from '../repositories/user/create';
import { IFindUserByEmailRepository } from '../repositories/user/find-by-email';
import { IFindUserByGitHubRepository } from '../repositories/user/find-by-github';
import { CreateUserDTO, ICreateUserUseCase } from './interfaces/create';

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private readonly findUserByEmailRepository: IFindUserByEmailRepository,
    private readonly findUserByGitHubRepository: IFindUserByGitHubRepository,
    private readonly encrypterAdapter: IEncrypterAdapter,
    private readonly createUserRepository: ICreateUserRepository
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
    const emailAlreadyExists = await this.findUserByEmailRepository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new AlreadyExistsError(`Email "${email}" already exists`);
    }

    const githubAccountAlreadyExists = await this.findUserByGitHubRepository.findByGitHub(
      githubAccount
    );

    if (githubAccountAlreadyExists) {
      throw new AlreadyExistsError(`GitHub account "${githubAccount}" already exists`);
    }

    const encryptedPassword = await this.encrypterAdapter.encrypt(password);

    const user = await this.createUserRepository.create({
      email,
      name,
      bio,
      nickname,
      password: encryptedPassword,
      githubAccount,
      specialties,
    });

    return user;
  }
}
