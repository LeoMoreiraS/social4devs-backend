import { query } from '@shared/infra/database/connection';

import { UserFollow } from '@follow/domain/entities/user-follow';
import { CreateUserFollowDTO } from '@follow/domain/repositories/dtos/create-user-follow-dto';
import { DeleteUserFollowDTO } from '@follow/domain/repositories/dtos/delete-user-follow-dto';
import { FindFollowersDTO } from '@follow/domain/repositories/dtos/find-followers-dto';
import { FindFollowsDTO } from '@follow/domain/repositories/dtos/find-follows-dto';
import { FindUserFollowDTO } from '@follow/domain/repositories/dtos/find-user-follow-dto';
import { IUserFollowRepository } from '@follow/domain/repositories/user-follow-repository';

export class UserFollowRepository implements IUserFollowRepository {
  async create({
    emailUserFollower,
    emailUserFollowed,
  }: CreateUserFollowDTO.Params): Promise<CreateUserFollowDTO.Result> {
    const followResponse = await query(`
      INSERT INTO users_follows (email_follower, email_followed)
      VALUES('${emailUserFollower}', '${emailUserFollowed}')
      RETURNING *;
    `);

    const createdUserFollow: UserFollow = followResponse.rows[0];

    return createdUserFollow;
  }

  async findOne({
    emailUserFollower,
    emailUserFollowed,
  }: FindUserFollowDTO.Params): Promise<FindUserFollowDTO.Result> {
    const { rows: queryResponse } = await query(`
      SELECT * FROM users_follows 
      WHERE email_follower = '${emailUserFollower}' 
      AND email_followed = '${emailUserFollowed}';
    `);

    const findUserFollow = queryResponse.length > 0 ? queryResponse[0] : null;
    return findUserFollow;
  }

  async delete({
    emailUserFollower,
    emailUserUnfollowed,
  }: DeleteUserFollowDTO.Params): Promise<UserFollow> {
    const { rows: queryResponse } = await query(`
      DELETE FROM users_follows 
      WHERE email_follower = '${emailUserFollower}' 
      AND email_followed = '${emailUserUnfollowed}'
      RETURNING *;
    `);

    const deletedUserFollow = queryResponse.length > 0 ? queryResponse[0] : null;
    return deletedUserFollow;
  }

  async findFollowers({ email }: FindFollowersDTO.Params): Promise<FindFollowersDTO.Result> {
    const { rows: queryResponse } = await query(`
      SELECT email, name, bio, nickname, githubAccount FROM users
      JOIN users_follows ON users.email = users_follows.email_follower 
      WHERE email_followed = '${email}' 
    `);

    const findUserFollowers = queryResponse.length > 0 ? queryResponse : null;
    return findUserFollowers;
  }

  async findFollows({ email }: FindFollowsDTO.Params): Promise<FindFollowsDTO.Result> {
    const { rows: queryResponse } = await query(`
      SELECT email, name, bio, nickname, githubAccount FROM users
      JOIN users_follows ON users.email = users_follows.email_followed 
      WHERE email_follower = '${email}' 
    `);

    const findUserFollows = queryResponse.length > 0 ? queryResponse : null;
    return findUserFollows;
  }
}
