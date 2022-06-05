import { Response, Request } from 'express';

import { JwtAuthenticatorAdapter } from '@shared/infra/adapters/jwt-authenticator-adapter';

import { AuthenticateUserUseCase } from '@user/domain/useCases/authenticate-user-use-case';
import { BcryptEncrypterAdapter } from '@user/infra/adapters/bcrypt-encrypter-adapter';
import { UserRepository } from '@user/infra/repositories/user-repository';

export class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const userRepository = new UserRepository();
    const bcryptEncrypterAdapter = new BcryptEncrypterAdapter();
    const jwtAuthenticatorAdapter = new JwtAuthenticatorAdapter();
    const authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepository,
      bcryptEncrypterAdapter,
      jwtAuthenticatorAdapter
    );

    const result = await authenticateUserUseCase.execute({
      email,
      password,
    });

    return response.status(200).json(result);
  }
}
