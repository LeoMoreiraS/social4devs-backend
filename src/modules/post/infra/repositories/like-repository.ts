import { query } from '@shared/infra/database/connection';

import { CreateLikeDTO } from '@post/domain/repositories/dtos/create-like-dto';
import { DeleteLikeDTO } from '@post/domain/repositories/dtos/delete-like-dto';
import { ILikeRepository } from '@post/domain/repositories/like-repository';

export class LikeRepository implements ILikeRepository {
  async delete({ postEmail, postBody, userEmail }: CreateLikeDTO.Params): Promise<void> {
    await query(` 
     DELETE FROM LIKES
     WHERE post_email = '${postEmail}' AND
     post_body = '${postBody}' AND
     user_email = '${userEmail}';
    `);
  }
  async create({ postEmail, postBody, userEmail }: DeleteLikeDTO.Params): Promise<void> {
    await query(` 
      INSERT INTO 
      LIKES (post_email, post_body, user_email) 
      VALUES(
       '${postEmail}',
       '${postBody}',
       '${userEmail}');
    `);
  }
}
