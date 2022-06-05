import { query } from '@shared/infra/database/connection';

import { Message } from '@message/domain/entities/message';
import { CreateMessageDTO } from '@message/domain/repositories/dtos/create-message-dto';
import { GetUserChatDTO } from '@message/domain/repositories/dtos/get-user-chat-dto';
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

  async getUserChat({
    emailUserSender,
    emailUserReceiver,
  }: GetUserChatDTO.Params): Promise<GetUserChatDTO.Result> {
    const { rows: queryResponse } = await query(`
      SELECT * FROM messages
      WHERE (email_sender = '${emailUserSender}' OR email_sender = '${emailUserReceiver}')
      AND (email_receiver = '${emailUserSender}' OR email_receiver = '${emailUserReceiver}')
      ORDER BY created_at DESC;
    `);

    return queryResponse;
  }
}
