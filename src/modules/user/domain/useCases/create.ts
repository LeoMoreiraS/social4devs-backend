import { AlreadyExistsError } from '@shared/errors/already-exists';

import { IEncrypterAdapter } from '../adapters/encrypter';
import { User } from '../entities/user';
import { IFindUserByEmailRepository } from '../repositories/find-by-email';
import { IFindUserByGitHubRepository } from '../repositories/find-by-github';
import { CreateUserDTO, ICreateUserUseCase } from './interfaces/icreate';

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private readonly findUserByEmailRepository: IFindUserByEmailRepository,
    private readonly findUserByGitHubRepository: IFindUserByGitHubRepository,
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
  }: CreateUserDTO.Params): Promise<User> {
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

    const encryptedPassword = this.encrypterAdapter.encrypt(password);

    return null as unknown as User;
  }
}
