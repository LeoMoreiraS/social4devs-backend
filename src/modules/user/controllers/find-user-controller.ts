import { Response, Request } from 'express';

import { FindUserWithJoinsUseCase } from '@user/domain/useCases/find-user-use-case';
import { UserRepository } from '@user/infra/repositories/user-repository';

import { SpecialtyRepository } from '@specialty/infra/repositories/specialty-repository';

import { UserFollowRepository } from '@follow/infra/repositories/user-follow-repository';

export class FindUserWithJoinsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user = response.locals.decodedToken;

    const userRepository = new UserRepository();
    const specialtyRepository = new SpecialtyRepository();
    const userFollowRepository = new UserFollowRepository();
    const createUserUseCase = new FindUserWithJoinsUseCase(
      userRepository,
      specialtyRepository,
      userFollowRepository
    );

    const result = await createUserUseCase.execute({
      email: user.email,
    });

    return response.status(200).json(result);
  }
}
