import { AppError } from '@shared/errors/app-error';

import { Specialty } from '../entities/specialty';
import { ISpecialtyRepository } from '../repositories/specialty-repository';

export namespace CreateSpecialtyUseCaseDTO {
  export type Params = {
    userEmail: string;
    name: string;
  };

  export type Result = Specialty;
}

export class CreateSpecialtyUseCase {
  constructor(private readonly specialtyRepository: ISpecialtyRepository) {}

  async execute({
    userEmail,
    name,
  }: CreateSpecialtyUseCaseDTO.Params): Promise<CreateSpecialtyUseCaseDTO.Result> {
    if (!userEmail || !name) {
      throw new AppError('Missing params');
    }

    const userAlreadyHasSpecialty = await this.specialtyRepository.findOne({ userEmail, name });

    if (userAlreadyHasSpecialty) {
      throw new AppError(`User '${userEmail}' already has specialty '${name}'`);
    }

    const createdSpecialty = await this.specialtyRepository.create({
      userEmail,
      name,
    });

    return createdSpecialty;
  }
}
