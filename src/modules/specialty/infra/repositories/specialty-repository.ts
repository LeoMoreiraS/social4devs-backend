import { query } from '@shared/infra/database/connection';

import { Specialty } from '@specialty/domain/entities/specialty';
import { CreateSpecialtyDTO } from '@specialty/domain/repositories/dtos/create-specialty-dto';
import { DeleteSpecialtyDTO } from '@specialty/domain/repositories/dtos/delete-specialty-dto';
import { FindOneSpecialtyDTO } from '@specialty/domain/repositories/dtos/find-specialty-dto';
import { ISpecialtyRepository } from '@specialty/domain/repositories/specialty-repository';

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

  async findOne({
    userEmail,
    name,
  }: FindOneSpecialtyDTO.Params): Promise<FindOneSpecialtyDTO.Result> {
    const { rows: queryResponse } = await query(
      `SELECT * FROM specialties WHERE user_email = '${userEmail}' AND name = '${name}';`
    );

    const findSpecialty = queryResponse.length > 0 ? queryResponse[0] : null;
    return findSpecialty;
  }

  async delete({ userEmail, name }: DeleteSpecialtyDTO.Params): Promise<DeleteSpecialtyDTO.Result> {
    const { rows: queryResponse } = await query(`
      DELETE FROM specialties 
      WHERE user_email = '${userEmail}' AND name = '${name}'
      RETURNING user_email, name;
    `);

    const deletedSpecialty = queryResponse.length > 0 ? queryResponse[0] : null;
    return deletedSpecialty;
  }
}
