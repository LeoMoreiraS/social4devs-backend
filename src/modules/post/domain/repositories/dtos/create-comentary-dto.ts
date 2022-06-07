import { Commentary } from '@post/domain/entities/commentary';

export namespace CreateCommentaryDTO {
  export type Params = {
    postEmail: string;
    postBody: string;
    userEmail: string;
    commentary: string;
  };

  export type Result = Commentary;
}
