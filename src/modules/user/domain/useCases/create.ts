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

    return null as unknown as User;
  }
}
