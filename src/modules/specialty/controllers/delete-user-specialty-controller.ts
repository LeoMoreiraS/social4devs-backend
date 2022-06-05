import { Response, Request } from 'express';

import { DeleteSpecialtyUseCase } from '@specialty/domain/useCases/delete-user-specialty-use-case';
import { SpecialtyRepository } from '@specialty/infra/repositories/specialty-repository';

export class DeleteSpecialtyController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const user = response.locals.decodedToken;

    const specialtyRepository = new SpecialtyRepository();
    const createSpecialtyUseCase = new DeleteSpecialtyUseCase(specialtyRepository);

    const result = await createSpecialtyUseCase.execute({
      userEmail: user.email,
      name,
    });

    return response.status(200).json(result);
  }
}
