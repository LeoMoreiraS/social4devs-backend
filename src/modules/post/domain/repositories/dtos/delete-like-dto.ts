import { Like } from '@post/domain/entities/like';

export namespace DeleteLikeDTO {
  export type Params = {
    postEmail: string;
    postBody: string;
    userEmail: string;
  };

  export type Result = Like;
}
