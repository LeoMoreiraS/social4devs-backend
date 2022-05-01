import { User } from '../../entities/user';

export namespace CreateUserDTO {
  export type Params = {
    email: string;
    name: string;
    bio: string;
    nickname: string;
    password: string;
    githubAccount: string;
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
    githubAccount,
    specialties,
  }: CreateUserDTO.Params): Promise<CreateUserDTO.Result>;
}
