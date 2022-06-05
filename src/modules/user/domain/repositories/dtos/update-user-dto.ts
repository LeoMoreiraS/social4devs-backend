import { User } from '@user/domain/entities/user';

export namespace UpdateUserDTO {
  export type Params = {
    currentEmail: string;
    email?: string;
    name?: string;
    bio?: string;
    nickname?: string;
    password?: string;
    githubAccount?: string;
  };

  export type Result = User;
}
