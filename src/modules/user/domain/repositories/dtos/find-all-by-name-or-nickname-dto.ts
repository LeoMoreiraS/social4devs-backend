import { User } from '@user/domain/entities/user';

export namespace FindAllUsersByNameOrNicknameDTO {
  export type Params = {
    name?: string;
    nickname?: string;
  };

  export type Result = User[];
}
