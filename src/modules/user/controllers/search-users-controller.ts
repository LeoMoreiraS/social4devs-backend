import { Response, Request } from 'express';

import { SearchUsersUseCase } from '@user/domain/useCases/search-users-use-case';
import { UserRepository } from '@user/infra/repositories/user-repository';

export class SearchUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, nickname } = request.headers;

    const userRepository = new UserRepository();
    const getUserInfoUseCase = new SearchUsersUseCase(userRepository);

    const result = await getUserInfoUseCase.execute({
      name: name?.toString(),
      nickname: nickname?.toString(),
    });

    return response.status(200).json(result);
  }
}
