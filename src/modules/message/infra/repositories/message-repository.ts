import { query } from '@shared/infra/database/connection';

import { Message } from '@message/domain/entities/message';
import { CreateMessageDTO } from '@message/domain/repositories/dtos/create-message-dto';
import { IMessageRepository } from '@message/domain/repositories/message-repository';

export class MessageRepository implements IMessageRepository {
  async create({
    emailUserSender,
    emailUserReceiver,
    text,
  }: CreateMessageDTO.Params): Promise<CreateMessageDTO.Result> {
    const messageResponse = await query(`
      INSERT INTO messages (email_sender, email_receiver, text)
      VALUES('${emailUserSender}', '${emailUserReceiver}', '${text}')
      RETURNING *;
    `);

    const createdMessage: Message = messageResponse.rows[0];

    return createdMessage;
  }

  // async findOne({
  //   emailUserFollower,
  //   emailUserFollowed,
  // }: FindUserFollowDTO.Params): Promise<FindUserFollowDTO.Result> {
  //   const { rows: queryResponse } = await query(`
  //     SELECT * FROM users_follows
  //     WHERE email_follower = '${emailUserFollower}'
  //     AND email_followed = '${emailUserFollowed}';
  //   `);

  //   const findUserFollow = queryResponse.length > 0 ? queryResponse[0] : null;
  //   return findUserFollow;
  // }

  // async delete({
  //   emailUserFollower,
  //   emailUserUnfollowed,
  // }: DeleteUserFollowDTO.Params): Promise<UserFollow> {
  //   const { rows: queryResponse } = await query(`
  //     DELETE FROM users_follows
  //     WHERE email_follower = '${emailUserFollower}'
  //     AND email_followed = '${emailUserUnfollowed}'
  //     RETURNING *;
  //   `);

  //   const deletedUserFollow = queryResponse.length > 0 ? queryResponse[0] : null;
  //   return deletedUserFollow;
  // }
}
