import { query } from '@shared/infra/database/connection';

import { CreateLikeDTO } from '@post/domain/repositories/dtos/create-like-dto';
import { ILikeRepository } from '@post/domain/repositories/like-repository';

export class LikeRepository implements ILikeRepository {
  async create({ postEmail, postBody, userEmail }: CreateLikeDTO.Params): Promise<void> {
    await query(` INSERT INTO LIKES (post_email, post_body, user_email) 
      VALUES(
       '${postEmail}',
       '${postBody}',
       '${userEmail}');
    `);
  }
}
