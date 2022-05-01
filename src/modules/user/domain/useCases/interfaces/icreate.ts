import { User } from '../../entities/user';

export namespace CreateUserDTO {
  export type Params = {
    email: string;
    name: string;
    bio: string;
    nickname: string;
    password: string;
    github_account: string;
    specialties: string[];
  }

  export type Result = User
}

export interface ICreateUserUseCase {
  execute({
    email,
    name,
    bio,
    nickname,
    password,
    github_account,
    specialties,
  }: CreateUserDTO.Params): Promise<CreateUserDTO.Result>;
}
