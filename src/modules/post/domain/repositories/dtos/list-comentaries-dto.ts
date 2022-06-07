import { Commentary } from '@post/domain/entities/commentary';

export namespace ListCommentaryDTO {
  export type Params = {
    postEmail: string;
    postBody: string;
  };

  export type Result = Commentary[];
}
