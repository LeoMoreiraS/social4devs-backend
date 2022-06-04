import { CreateSpecialtyDTO } from './dtos/create-specialty-dto';

export interface ISpecialtyRepository {
  create({ userEmail, name }: CreateSpecialtyDTO.Params): Promise<CreateSpecialtyDTO.Result>;
}
