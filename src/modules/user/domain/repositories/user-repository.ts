import { CreateUserDTO } from './dtos/create-user-dto';
import { DeleteUserDTO } from './dtos/delete-user-dto';
import { FindAllUsersByNameOrNicknameDTO } from './dtos/find-all-by-name-or-nickname-dto';
import { FindUserByEmailDTO } from './dtos/find-user-by-email-dto';
import { FindUserByGithubDTO } from './dtos/find-user-by-github-dto';
import { UpdateUserDTO } from './dtos/update-user-dto';

export interface IUserRepository {
  create(params: CreateUserDTO.Params): Promise<CreateUserDTO.Result>;
  findByEmail({ email }: FindUserByEmailDTO.Params): Promise<FindUserByEmailDTO.Result>;
  findByGithub({ githubAccount }: FindUserByGithubDTO.Params): Promise<FindUserByGithubDTO.Result>;
  findAllByNameOrNickname(
    params: FindAllUsersByNameOrNicknameDTO.Params
  ): Promise<FindAllUsersByNameOrNicknameDTO.Result>;
  update(params: UpdateUserDTO.Params): Promise<UpdateUserDTO.Result>;
  delete(params: DeleteUserDTO.Params): Promise<DeleteUserDTO.Result>;
}
