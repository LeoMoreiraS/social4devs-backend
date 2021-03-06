import { Response, Request } from 'express';

import { CreateUserUseCase } from '@user/domain/useCases/create-user-use-case';
import { BcryptEncrypterAdapter } from '@user/infra/adapters/bcrypt-encrypter-adapter';
import { UserRepository } from '@user/infra/repositories/user-repository';

import { CreateSpecialtyUseCase } from '@specialty/domain/useCases/create-user-specialty-use-case';
import { SpecialtyRepository } from '@specialty/infra/repositories/specialty-repository';

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, name, bio, nickname, password, githubAccount, specialties } = request.body;

    const userRepository = new UserRepository();
    const specialtyRepository = new SpecialtyRepository();
    const createSpecialtyUseCase = new CreateSpecialtyUseCase(specialtyRepository);
    const bcryptEncrypterAdapter = new BcryptEncrypterAdapter();
    const createUserUseCase = new CreateUserUseCase(
      userRepository,
      createSpecialtyUseCase,
      bcryptEncrypterAdapter
    );

    const result = await createUserUseCase.execute({
      email,
      name,
      bio,
      nickname,
      password,
      githubAccount,
      specialties,
    });

    return response.status(201).json(result);
  }
}
