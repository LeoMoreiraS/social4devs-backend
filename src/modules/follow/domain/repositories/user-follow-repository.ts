import { CreateUserFollowDTO } from './dtos/create-user-follow-dto';
import { DeleteUserFollowDTO } from './dtos/delete-user-follow-dto';
import { FindFollowersDTO } from './dtos/find-followers-dto';
import { FindFollowsDTO } from './dtos/find-follows-dto';
import { FindUserFollowDTO } from './dtos/find-user-follow-dto';

export interface IUserFollowRepository {
  create(params: CreateUserFollowDTO.Params): Promise<CreateUserFollowDTO.Result>;
  findOne(params: FindUserFollowDTO.Params): Promise<FindUserFollowDTO.Result>;
  delete(params: DeleteUserFollowDTO.Params): Promise<DeleteUserFollowDTO.Result>;
  findFollowers(params: FindFollowersDTO.Params): Promise<FindFollowersDTO.Result>;
  findFollows(params: FindFollowsDTO.Params): Promise<FindFollowsDTO.Result>;
}
