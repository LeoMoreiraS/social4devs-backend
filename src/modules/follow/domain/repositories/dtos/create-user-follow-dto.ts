import { UserFollow } from '../../entities/user-follow';

export namespace CreateUserFollowDTO {
  export type Params = {
    emailUserFollower: string;
    emailUserFollowed: string;
  };

  export type Result = UserFollow;
}
