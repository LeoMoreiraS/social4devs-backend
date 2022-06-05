import { AppError } from '@shared/errors/app-error';

import { Specialty } from '../entities/specialty';
import { ISpecialtyRepository } from '../repositories/specialty-repository';

export namespace DeleteSpecialtyUseCaseDTO {
  export type Params = {
    userEmail: string;
    name: string;
  };

  export type Result = Specialty | null;
}

export class DeleteSpecialtyUseCase {
  constructor(private readonly specialtyRepository: ISpecialtyRepository) {}

  async execute({
    userEmail,
    name,
  }: DeleteSpecialtyUseCaseDTO.Params): Promise<DeleteSpecialtyUseCaseDTO.Result> {
    if (!userEmail || !name) {
      throw new AppError('Missing params');
    }

    const userHasSpecialty = await this.specialtyRepository.findOne({ userEmail, name });

    if (!userHasSpecialty) {
      throw new AppError('Specialty not found');
    }

    const deletedSpecialty = await this.specialtyRepository.delete({ userEmail, name });

    return deletedSpecialty;
  }
}
