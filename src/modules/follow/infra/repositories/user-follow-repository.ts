import { query } from '@shared/infra/database/connection';

import { UserFollow } from '@follow/domain/entities/user-follow';
import { CreateUserFollowDTO } from '@follow/domain/repositories/dtos/create-user-follow-dto';
import { FindUserFollowDTO } from '@follow/domain/repositories/dtos/find-user-follow-dto';
import { IUserFollowRepository } from '@follow/domain/repositories/user-follow-repository';

export class UserFollowRepository implements IUserFollowRepository {
  async create({
    emailUserFollower,
    emailUserFollowed,
  }: CreateUserFollowDTO.Params): Promise<CreateUserFollowDTO.Result> {
    const specialtyResponse = await query(`
      INSERT INTO user_follow (email_follower, email_followed)
      VALUES('${emailUserFollower}', '${emailUserFollowed}')
      RETURNING *;
    `);

    const createdUserFollow: UserFollow = specialtyResponse.rows[0];

    return createdUserFollow;
  }

  async findOne({
    emailUserFollower,
    emailUserFollowed,
  }: FindUserFollowDTO.Params): Promise<FindUserFollowDTO.Result> {
    const { rows: queryResponse } = await query(`
      SELECT * FROM user_follow 
      WHERE email_follower = '${emailUserFollower}' 
      AND email_followed = '${emailUserFollowed}';
    `);

    const findUserFollow = queryResponse.length > 0 ? queryResponse[0] : null;
    return findUserFollow;
  }
}
