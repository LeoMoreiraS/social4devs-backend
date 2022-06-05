import { CreateMessageDTO } from './dtos/create-message-dto';

export interface IMessageRepository {
  create(params: CreateMessageDTO.Params): Promise<CreateMessageDTO.Result>;
  // findOne(params: FindUserFollowDTO.Params): Promise<FindUserFollowDTO.Result>;
  // delete(params: DeleteUserFollowDTO.Params): Promise<DeleteUserFollowDTO.Result>;
}
