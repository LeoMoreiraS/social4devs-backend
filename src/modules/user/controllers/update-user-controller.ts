import { Response, Request } from 'express';

import { UpdateUserUseCase } from '@user/domain/useCases/update-user-use-case';
import { BcryptEncrypterAdapter } from '@user/infra/adapters/bcrypt-encrypter-adapter';
import { UserRepository } from '@user/infra/repositories/user-repository';

export class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, name, bio, nickname, password, githubAccount } = request.body;

    const user = response.locals.decodedToken;

    const userRepository = new UserRepository();
    const bcryptEncrypterAdapter = new BcryptEncrypterAdapter();
    const createUserUseCase = new UpdateUserUseCase(userRepository, bcryptEncrypterAdapter);

    const result = await createUserUseCase.execute({
      user,
      email,
      name,
      bio,
      nickname,
      password,
      githubAccount,
    });

    return response.status(200).json(result);
  }
}
