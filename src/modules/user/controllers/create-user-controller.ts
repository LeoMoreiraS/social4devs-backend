import { Response, Request } from 'express';

import { CreateUserUseCase } from '@user/domain/useCases/create-user-use-case';
import { UserRepository } from '@user/infra/repositories/user-repository';

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, name, bio, nickname, password, githubAccount, specialties } = request.body;

    const userRepository = new UserRepository();
    const createUserUseCase = new CreateUserUseCase(userRepository);

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
