import { AlreadyExistsError } from '@shared/errors/already-exists';

import { User } from '../entities/user';
import { IFindUserByEmailRepository } from '../repositories/find';
import { CreateUserDTO, ICreateUserUseCase } from './interfaces/icreate';

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(private readonly findUserByEmailRepository: IFindUserByEmailRepository) {}

  async execute({
    email,
    name,
    bio,
    nickname,
    password,
    github_account,
    specialties,
  }: CreateUserDTO.Params): Promise<User> {
    const emailAlreadyExists = await this.findUserByEmailRepository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new AlreadyExistsError(`Email '${email}' already exists`);
    }

    return null as unknown as User;
  }
}
