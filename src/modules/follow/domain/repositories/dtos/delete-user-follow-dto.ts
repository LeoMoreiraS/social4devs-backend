import { UserFollow } from '../../entities/user-follow';

export namespace DeleteUserFollowDTO {
  export type Params = {
    emailUserFollower: string;
    emailUserUnfollowed: string;
  };

  export type Result = UserFollow;
}
