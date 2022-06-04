import { pg } from '@shared/infra/database/connection';

import { User } from '@user/domain/entities/user';
import { CreateUserDTO } from '@user/domain/repositories/dtos/create-user-dto';
import { FindUserByEmailDTO } from '@user/domain/repositories/dtos/find-user-by-email-dto';
import { FindUserByGithubDTO } from '@user/domain/repositories/dtos/find-user-by-github-dto';
import { IUserRepository } from '@user/domain/repositories/user-repository';

export class UserRepository implements IUserRepository {
  async create({
    email,
    name,
    bio,
    nickname,
    password,
    githubAccount,
    specialties,
  }: CreateUserDTO.Params): Promise<User> {
    const userResponse = await pg.query(`
      INSERT INTO users (email, name, bio, nickname, password, githubAccount) 
      VALUES('${email}', '${name}', '${bio}', '${nickname}', '${password}', '${githubAccount}')
      RETURNING *;
    `);

    const createSpecialtiesPromises = specialties.map(async (specialty) => {
      const specialtyResponse = await pg.query(`
        INSERT INTO specialties (user_email, name) 
        VALUES('${email}', '${specialty}')
        RETURNING *;
      `);

      const createdSpecialty = specialtyResponse.rows[0];

      return createdSpecialty.name;
    });

    const createdSpecialties = await Promise.all(createSpecialtiesPromises);

    const createdUser: User = {
      ...userResponse.rows[0],
      specialties: createdSpecialties,
    };

    return createdUser;
  }

  async findByEmail({ email }: FindUserByEmailDTO.Params): Promise<FindUserByEmailDTO.Result> {
    const { rows: queryResponse } = await pg.query(
      `SELECT * FROM users WHERE email = '${email}' LIMIT 1;`
    );

    const findUser = queryResponse.length > 0 ? queryResponse[0] : null;
    return findUser;
  }

  findByGithub({ githubAccount }: FindUserByGithubDTO.Params): Promise<FindUserByGithubDTO.Result> {
    throw new Error('Method not implemented.');
  }
}
