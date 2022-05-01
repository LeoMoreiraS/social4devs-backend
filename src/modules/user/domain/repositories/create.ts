import { User } from '../entities/user';

export namespace CreateUserRepositoryDTO {
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

export interface ICreateUserRepository {
  create(params: CreateUserRepositoryDTO.Params): Promise<CreateUserRepositoryDTO.Result>;
}
