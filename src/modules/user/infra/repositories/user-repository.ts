import { pgQuery } from '@shared/infra/database/connection';

import { User } from '@user/domain/entities/user';
import { CreateUserDTO } from '@user/domain/repositories/dtos/create-user-dto';
import { FindUserByEmailDTO } from '@user/domain/repositories/dtos/find-user-by-email-dto';
import { FindUserByGithubDTO } from '@user/domain/repositories/dtos/find-user-by-github-dto';
import { IUserRepository } from '@user/domain/repositories/user-repository';

export class UserRepository implements IUserRepository {
  create({
    email,
    name,
    bio,
    nickname,
    password,
    githubAccount,
    specialties,
  }: CreateUserDTO.Params): Promise<User> {
    pgQuery.query(`
      INSERT INTO users (email, name, bio, nickname, password, githubAccount) 
      VALUES('${email}', '${name}', '${bio}', '${nickname}', '${password}', '${githubAccount}')
    `);
  }

  findByEmail({ email }: FindUserByEmailDTO.Params): Promise<FindUserByEmailDTO.Result> {
    throw new Error('Method not implemented.');
  }

  findByGitHub({ githubAccount }: FindUserByGithubDTO.Params): Promise<FindUserByGithubDTO.Result> {
    throw new Error('Method not implemented.');
  }
}
