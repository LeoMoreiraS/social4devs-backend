import { CreateUserDTO } from './dtos/create-user-dto';
import { FindUserByEmailDTO } from './dtos/find-user-by-email-dto';
import { FindUserByGithubDTO } from './dtos/find-user-by-github-dto';
import { UpdateUserDTO } from './dtos/update-user-dto';

export interface IUserRepository {
  create(params: CreateUserDTO.Params): Promise<CreateUserDTO.Result>;
  findByEmail({ email }: FindUserByEmailDTO.Params): Promise<FindUserByEmailDTO.Result>;
  findByGithub({ githubAccount }: FindUserByGithubDTO.Params): Promise<FindUserByGithubDTO.Result>;
  update(params: UpdateUserDTO.Params): Promise<UpdateUserDTO.Result>;
}
