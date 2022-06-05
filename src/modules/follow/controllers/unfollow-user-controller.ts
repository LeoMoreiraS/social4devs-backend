import { Response, Request } from 'express';

import { UserRepository } from '@user/infra/repositories/user-repository';

import { UnfollowUserUseCase } from '@follow/domain/useCases/unfollow-user-use-case';
import { UserFollowRepository } from '@follow/infra/repositories/user-follow-repository';

export class UnfollowUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { emailUserUnfollowed } = request.body;

    const user = response.locals.decodedToken;

    const userRepository = new UserRepository();
    const userFollowRepository = new UserFollowRepository();
    const followUserUseCase = new UnfollowUserUseCase(userRepository, userFollowRepository);

    const result = await followUserUseCase.execute({
      emailUserFollower: user.email,
      emailUserUnfollowed,
    });

    return response.status(200).json(result);
  }
}
