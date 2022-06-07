import { query } from '@shared/infra/database/connection';

import { User } from '@user/domain/entities/user';
import { CreateUserDTO } from '@user/domain/repositories/dtos/create-user-dto';
import { FindAllUsersByNameOrNicknameDTO } from '@user/domain/repositories/dtos/find-all-by-name-or-nickname-dto';
import { FindUserByEmailDTO } from '@user/domain/repositories/dtos/find-user-by-email-dto';
import { FindUserByGithubDTO } from '@user/domain/repositories/dtos/find-user-by-github-dto';
import { UpdateUserDTO } from '@user/domain/repositories/dtos/update-user-dto';
import { IUserRepository } from '@user/domain/repositories/user-repository';

export class UserRepository implements IUserRepository {
  async create({
    email,
    name,
    bio,
    nickname,
    password,
    githubAccount,
  }: CreateUserDTO.Params): Promise<User> {
    const userResponse = await query(`
      INSERT INTO users (email, name, bio, nickname, password, github_account) 
      VALUES('${email}', '${name}', '${bio}', '${nickname}', '${password}', '${githubAccount}')
      RETURNING email, name, bio, nickname, github_account;
    `);

    const createdUser: User = userResponse.rows[0];

    return createdUser;
  }

  async findByEmail({ email }: FindUserByEmailDTO.Params): Promise<FindUserByEmailDTO.Result> {
    const { rows: queryResponse } = await query(
      `SELECT * FROM users WHERE email = '${email}' LIMIT 1;`
    );

    const findUser = queryResponse.length > 0 ? queryResponse[0] : null;
    return findUser;
  }

  async findByGithub({
    githubAccount,
  }: FindUserByGithubDTO.Params): Promise<FindUserByGithubDTO.Result> {
    const queryResponse = await query(
      `SELECT * FROM users WHERE github_account = '${githubAccount}' LIMIT 1;`
    );

    const queryRows = queryResponse?.rows;

    const findUser = queryRows.length > 0 ? queryRows[0] : null;
    return findUser;
  }

  async findAllByNameOrNickname({
    name,
    nickname,
  }: FindAllUsersByNameOrNicknameDTO.Params): Promise<FindAllUsersByNameOrNicknameDTO.Result> {
    const paramsToSearchWithLastComma = `
      ${name ? `name LIKE '%${name}%',` : ''}
      ${nickname ? `nickname LIKE '%${nickname}%',` : ''}
    `;

    // Todos os ternários acima possuem uma vírgula no final, o que causaria um erro na execução da query
    // A função abaixo utiliza um regex para remover tudo após a última vírgula da string de parâmetros
    const paramsToSearchWithoutLastComma = paramsToSearchWithLastComma.replace(/,([^,]*)$/, '');

    const queryResponse = await query(
      `SELECT * FROM users WHERE ${paramsToSearchWithoutLastComma};`
    );

    const users = queryResponse?.rows;

    return users;
  }

  async update({
    currentEmail,
    email,
    name,
    bio,
    nickname,
    password,
    githubAccount,
  }: UpdateUserDTO.Params): Promise<User> {
    const paramsToUpdateWithLastComma = `
      ${email ? `email = '${email}',` : ''}
      ${name ? `name = '${name}',` : ''}
      ${bio ? `bio = '${bio}',` : ''}
      ${nickname ? `nickname = '${nickname}',` : ''}
      ${password ? `password = '${password}',` : ''}
      ${githubAccount ? `github_account = '${githubAccount}',` : ''}
    `;

    // Todos os ternários acima possuem uma vírgula no final, o que causaria um erro na execução da query
    // A função abaixo utiliza um regex para remover tudo após a última vírgula da string de parâmetros
    const paramsToUpdateWithoutLastComma = paramsToUpdateWithLastComma.replace(/,([^,]*)$/, '');

    const userResponse = await query(`
      UPDATE users SET ${paramsToUpdateWithoutLastComma}
      WHERE email = '${currentEmail}'
      RETURNING email, name, bio, nickname, github_account;
    `);

    const updatedUser: User = userResponse.rows[0];

    return updatedUser;
  }
}
