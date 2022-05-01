import { User } from '../entities/user';
import { CreateUserDTO, ICreateUserUseCase } from './interfaces/icreate';

export class CreateUserUseCase implements ICreateUserUseCase {
  async execute({
    email,
    name,
    bio,
    nickname,
    password,
    github_account,
    specialties,
  }: CreateUserDTO.Params): Promise<User> {
    return null as unknown as User;
  }
}
