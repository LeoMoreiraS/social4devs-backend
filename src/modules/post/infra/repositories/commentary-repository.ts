import { query } from '@shared/infra/database/connection';

import { ICommentaryRepository } from '@post/domain/repositories/comentary-repository';
import { CreateCommentaryDTO } from '@post/domain/repositories/dtos/create-comentary-dto';

export class CommentaryRepository implements ICommentaryRepository {
  async delete({
    postEmail,
    postBody,
    userEmail,
    commentary,
  }: CreateCommentaryDTO.Params): Promise<void> {
    await query(` 
     DELETE FROM COMMENTARIES
     WHERE post_email = '${postEmail}' AND
     post_body = '${postBody}' AND
     user_email = '${userEmail}' AND 
     commentary = '${commentary}';
    `);
  }

  async create({
    postEmail,
    postBody,
    userEmail,
    commentary,
  }: CreateCommentaryDTO.Params): Promise<void> {
    await query(` 
      INSERT INTO 
      COMMENTARIES (post_email, post_body, user_email, commentary) 
      VALUES(
       '${postEmail}',
       '${postBody}',
       '${userEmail}',
       '${commentary}');
    `);
  }
}
