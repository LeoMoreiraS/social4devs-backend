import { query } from '@shared/infra/database/connection';

import { Post } from '@post/domain/entities/post';
import { CreatePostDTO } from '@post/domain/repositories/dtos/create-post-dto';
import { FindPostDTO } from '@post/domain/repositories/dtos/find-post-dto';
import { IPostRepository } from '@post/domain/repositories/post-repository';

export class PostRepository implements IPostRepository {
  async find({ email, body }: FindPostDTO.Params): Promise<Post> {
    const response = await query(
      `SELECT * FROM POSTS WHERE publisher_email = '${email}' AND body = '${body}'`
    );
    return response.rows[0];
  }
  async list(email: string): Promise<Post[]> {
    const response = await query(
      `SELECT *,
      (SELECT count(*) from LIKES l where l.post_Email = P.publisher_email AND l.post_body = P.body) as TotalLikes
      FROM POSTS P WHERE publisher_email = '${email}';`
    );
    return response.rows;
  }
  async create({ email, body }: CreatePostDTO.Params): Promise<Post> {
    const response = await query(`
      INSERT INTO posts (publisher_email, body, created_at, updated_at) 
      VALUES(
       '${email}',
       '${body}',
       to_timestamp(${Date.now() / 1000.0}),
       to_timestamp(${Date.now() / 1000.0}))
      RETURNING publisher_email, body, created_at, updated_at;
    `);

    const createdPost: Post = response.rows[0];

    return createdPost;
  }
}
