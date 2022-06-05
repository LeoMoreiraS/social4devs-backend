import { Response, Request } from 'express';

import { UserRepository } from '@user/infra/repositories/user-repository';

import { FollowUserUseCase } from '@follow/domain/useCases/follow-user-use-case';
import { UserFollowRepository } from '@follow/infra/repositories/user-follow-repository';

export class FollowUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { emailUserFollowed } = request.body;

    const user = response.locals.decodedToken;

    const userRepository = new UserRepository();
    const userFollowRepository = new UserFollowRepository();
    const followUserUseCase = new FollowUserUseCase(userRepository, userFollowRepository);

    const result = await followUserUseCase.execute({
      emailUserFollower: user.email,
      emailUserFollowed,
    });

    return response.status(201).json(result);
  }
}
