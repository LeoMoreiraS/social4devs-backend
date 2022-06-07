import { Response, Request } from 'express';

import { GetUserInfoUseCase } from '@user/domain/useCases/get-user-info-use-case';
import { UserRepository } from '@user/infra/repositories/user-repository';

import { SpecialtyRepository } from '@specialty/infra/repositories/specialty-repository';

import { UserFollowRepository } from '@follow/infra/repositories/user-follow-repository';

export class FindUserProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.headers;

    const userRepository = new UserRepository();
    const specialtyRepository = new SpecialtyRepository();
    const userFollowRepository = new UserFollowRepository();
    const getUserInfoUseCase = new GetUserInfoUseCase(
      userRepository,
      specialtyRepository,
      userFollowRepository
    );

    const result = await getUserInfoUseCase.execute({
      email: email?.toString() ?? '',
    });

    return response.status(200).json(result);
  }
}
