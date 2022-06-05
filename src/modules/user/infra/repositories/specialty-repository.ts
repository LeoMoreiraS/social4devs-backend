import { query } from '@shared/infra/database/connection';

import { Specialty } from '@user/domain/entities/specialty';
import { CreateSpecialtyDTO } from '@user/domain/repositories/dtos/create-specialty-dto';
import { ISpecialtyRepository } from '@user/domain/repositories/specialty-repository';

export class SpecialtyRepository implements ISpecialtyRepository {
  async create({ userEmail, name }: CreateSpecialtyDTO.Params): Promise<CreateSpecialtyDTO.Result> {
    const specialtyResponse = await query(`
      INSERT INTO specialties (user_email, name)
      VALUES('${userEmail}', '${name}')
      RETURNING user_email, name;
    `);

    const createdSpecialty: Specialty = specialtyResponse.rows[0];

    return createdSpecialty;
  }
}
