import { CreateMessageDTO } from './dtos/create-message-dto';
import { GetUserChatDTO } from './dtos/get-user-chat-dto';

export interface IMessageRepository {
  create(params: CreateMessageDTO.Params): Promise<CreateMessageDTO.Result>;
  getUserChat(params: GetUserChatDTO.Params): Promise<GetUserChatDTO.Result>;
}
