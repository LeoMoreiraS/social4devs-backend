import { CreateUserFollowDTO } from './dtos/create-user-follow-dto';
import { DeleteUserFollowDTO } from './dtos/delete-user-follow-dto';
import { FindUserFollowDTO } from './dtos/find-user-follow-dto';

export interface IUserFollowRepository {
  create(params: CreateUserFollowDTO.Params): Promise<CreateUserFollowDTO.Result>;
  findOne(params: FindUserFollowDTO.Params): Promise<FindUserFollowDTO.Result>;
  delete(params: DeleteUserFollowDTO.Params): Promise<DeleteUserFollowDTO.Result>;
}
