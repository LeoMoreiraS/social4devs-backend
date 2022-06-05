import { query } from '@shared/infra/database/connection';

import { Specialty } from '@user/domain/entities/specialty';
import { CreateSpecialtyDTO } from '@user/domain/repositories/dtos/create-specialty-dto';
import { FindOneSpecialtyDTO } from '@user/domain/repositories/dtos/find-specialty-dto';
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
}
