import { User } from '@user/domain/entities/user';

export namespace FindFollowsDTO {
  export type Params = {
    email: string;
  };

  export type Result = User[] | null;
}
