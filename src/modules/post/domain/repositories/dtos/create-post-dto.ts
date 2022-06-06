import { Post } from '@post/domain/entities/post';

export namespace CreatePostDTO {
  export type Params = {
    email: string;
    body: string;
  };

  export type Result = Post;
}
