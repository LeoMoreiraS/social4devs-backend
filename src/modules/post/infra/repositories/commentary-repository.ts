import { query } from '@shared/infra/database/connection';

import { Commentary } from '@post/domain/entities/commentary';
import { ICommentaryRepository } from '@post/domain/repositories/comentary-repository';
import { CreateCommentaryDTO } from '@post/domain/repositories/dtos/create-comentary-dto';
import { ListCommentaryDTO } from '@post/domain/repositories/dtos/list-comentaries-dto';

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
  }: CreateCommentaryDTO.Params): Promise<Commentary> {
    await query(` 
      INSERT INTO 
      COMMENTARIES (post_email, post_body, user_email, commentary) 
      VALUES(
       '${postEmail}',
       '${postBody}',
       '${userEmail}',
       '${commentary}');
   
    `);
    const response = await query(` 
    SELECT C.*, U.name, U.nickname FROM  
    COMMENTARIES C JOIN USERS U ON U.email = C.user_email 
     WHERE post_email ='${postEmail}' AND
     post_body = '${postBody}' AND commentary = '${commentary}' AND user_email = '${userEmail}'
  `);
    return response.rows[0];
  }
  async find({
    postEmail,
    postBody,
    userEmail,
    commentary,
  }: CreateCommentaryDTO.Params): Promise<Commentary> {
    const response = await query(` 
      SELECT * FROM
      COMMENTARIES
      WHERE post_email ='${postEmail}' AND
      post_body = '${postBody}' AND user_email = '${userEmail}' AND commentary ='${commentary}';
      
    `);
    return response?.rows[0];
  }
  async listByPost({
    postEmail,
    postBody,
  }: ListCommentaryDTO.Params): Promise<ListCommentaryDTO.Result> {
    const response = await query(` 
      SELECT C.*, U.name, U.nickname FROM  
      COMMENTARIES C JOIN USERS U ON U.email = C.user_email
      
       WHERE post_email ='${postEmail}' AND
       post_body = '${postBody}'
      ORDER BY C.created_at DESC;
    `);
    return response?.rows;
  }
}
