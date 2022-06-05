import { Post } from '@post/domain/entities/post';

export namespace FindPostDTO {
  export type Params = {
    email: string;
    body: string;
  };

  export type Result = Post;
}
