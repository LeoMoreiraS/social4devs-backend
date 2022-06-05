import { User } from '@user/domain/entities/user';

export namespace CreateUserDTO {
  export type Params = {
    email: string;
    name: string;
    bio: string;
    nickname: string;
    password: string;
    githubAccount: string;
  };

  export type Result = User;
}
