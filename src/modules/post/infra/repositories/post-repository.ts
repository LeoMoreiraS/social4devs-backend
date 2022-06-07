import { query } from '@shared/infra/database/connection';

import { Post } from '@post/domain/entities/post';
import { CreatePostDTO } from '@post/domain/repositories/dtos/create-post-dto';
import { DeletePostDTO } from '@post/domain/repositories/dtos/delete-post-dto';
import { FindPostDTO } from '@post/domain/repositories/dtos/find-post-dto';
import { IPostRepository } from '@post/domain/repositories/post-repository';

export class PostRepository implements IPostRepository {
  async find({ email, body }: FindPostDTO.Params): Promise<Post> {
    const response = await query(
      `SELECT * FROM POSTS WHERE publisher_email = '${email}' AND body = '${body}'`
    );
    return response.rows[0];
  }
  async listByUserPage(publisherEmail: string, userEmail: string): Promise<Post[]> {
    const response = await query(
      `SELECT P.*, U.*,
      (SELECT count(*) from LIKES l where l.post_Email = P.publisher_email AND l.post_body = P.body) as TotalLikes,
      (SELECT count(*) from LIKES li where li.user_Email = '${userEmail}' and li.post_Email = P.publisher_email AND li.post_body = P.body) as liked
      FROM POSTS P JOIN USERS U ON P.publisher_email = U.email WHERE P.publisher_email = '${publisherEmail}'
      ORDER BY P.created_at DESC
      ;`
    );
    console.log(response.rows);
    const posts = await Promise.all(
      response?.rows.map<Promise<Post>>(async (row) => {
        const commentaries = await query(`SELECT C.*, U.nickname
      FROM COMMENTARIES  C JOIN USERS U ON C.user_email = U.email WHERE C.post_email = '${row.publisher_email}' AND C.post_body = '${row.body}'
      ORDER BY C.created_at;
      `);
        const likes = await query(`SELECT L.*, U.nickname
      FROM LIKES L JOIN USERS U ON L.user_email = U.email WHERE L.post_email = '${row.publisher_email}' AND L.post_body = '${row.body}';
      `);
        const post = {
          email: row.publisher_email,
          content: row.body,
          name: row.name,
          createdAt: row.created_at,
          nickname: row.nickname,
          updatedAt: row.updated_at,
          totalLikes: row.totallikes,
          liked: row.liked,
          commentaries: commentaries.rows,
          likes: likes.rows,
        };
        return post;
      })
    );

    return posts;
  }
  async listMainPage(userEmail: string): Promise<Post[]> {
    const response = await query(`SELECT *,
    (SELECT count(*) from LIKES l where l.post_Email = P.publisher_email AND l.post_body = P.body) as TotalLikes,
    (SELECT count(*) from LIKES li where li.user_Email = '${userEmail}' and li.post_Email = P.publisher_email AND li.post_body = P.body) as liked
    FROM POSTS P JOIN USERS U ON P.publisher_email = U.email WHERE publisher_email IN (SELECT email_followed FROM  USERS_FOLLOWS where email_follower= '${userEmail}') OR  P.publisher_email = '${userEmail}'
    ORDER BY P.created_at DESC
    ;`);

    const posts = await Promise.all(
      response?.rows.map<Promise<Post>>(async (row) => {
        const commentaries = await query(`SELECT C.*, U.nickname
      FROM COMMENTARIES C JOIN USERS U ON C.user_email = U.email WHERE C.post_email = '${row.publisher_email}' AND C.post_body = '${row.body}'
      ORDER BY C.created_at;
      `);
        const likes = await query(`SELECT L.*, U.nickname
      FROM LIKES L JOIN USERS U ON L.user_email = U.email WHERE L.post_email = '${row.publisher_email}' AND L.post_body = '${row.body}';
      `);
        const post = {
          email: row.publisher_email,
          content: row.body,
          name: row.name,
          nickname: row.nickname,
          createdAt: row.created_at,
          updatedAt: row.updated_at,
          totalLikes: row.totallikes,
          liked: row.liked,
          commentaries: commentaries.rows,
          likes: likes.rows,
        };
        return post;
      })
    );

    return posts;
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

  async delete({ email, body }: DeletePostDTO.Params): Promise<void> {
    await query(`
    DELETE FROM  posts WHERE
       publisher_email = '${email}' AND body =  
       '${body}';
    `);
  }
}
