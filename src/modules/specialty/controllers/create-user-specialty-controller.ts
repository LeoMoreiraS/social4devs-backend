import { Response, Request } from 'express';

import { CreateSpecialtyUseCase } from '@specialty/domain/useCases/create-user-specialty-use-case';
import { SpecialtyRepository } from '@specialty/infra/repositories/specialty-repository';

export class CreateSpecialtyController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const user = response.locals.decodedToken;

    const specialtyRepository = new SpecialtyRepository();
    const createSpecialtyUseCase = new CreateSpecialtyUseCase(specialtyRepository);

    const result = await createSpecialtyUseCase.execute({
      userEmail: user.email,
      name,
    });

    return response.status(201).json(result);
  }
}
