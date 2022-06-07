import { User } from '@user/domain/entities/user';

export namespace DeleteUserDTO {
  export type Params = { email: string };
  export type Result = User;
}
