import { User } from '@user/domain/entities/user';

export namespace FindUserByGithubDTO {
  export type Params = {
    githubAccount: string;
  };

  export type Result = User | null;
}
