import { Response, Request } from 'express';

import { DeleteUserUseCase } from '@user/domain/useCases/delete-user-use-case';
import { UserRepository } from '@user/infra/repositories/user-repository';

export class DeleteUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user = response.locals.decodedToken;

    const userRepository = new UserRepository();
    const createUserUseCase = new DeleteUserUseCase(userRepository);

    const result = await createUserUseCase.execute({
      email: user.email,
    });

    return response.status(200).json(result);
  }
}
