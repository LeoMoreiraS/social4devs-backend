import { UserFollow } from '../../entities/user-follow';

export namespace FindUserFollowDTO {
  export type Params = {
    emailUserFollower: string;
    emailUserFollowed: string;
  };

  export type Result = UserFollow;
}
