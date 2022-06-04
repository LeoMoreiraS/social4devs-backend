import { User } from '@user/domain/entities/user';

export namespace FindUserByEmailDTO {
  export type Params = {
    email: string;
  };

  export type Result = User | null;
}
