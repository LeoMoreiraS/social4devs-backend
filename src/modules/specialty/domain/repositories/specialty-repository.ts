import { CreateSpecialtyDTO } from './dtos/create-specialty-dto';
import { DeleteSpecialtyDTO } from './dtos/delete-specialty-dto';
import { FindOneSpecialtyDTO } from './dtos/find-specialty-dto';

export interface ISpecialtyRepository {
  create({ userEmail, name }: CreateSpecialtyDTO.Params): Promise<CreateSpecialtyDTO.Result>;
  findOne({ userEmail, name }: FindOneSpecialtyDTO.Params): Promise<FindOneSpecialtyDTO.Result>;
  delete({ userEmail, name }: DeleteSpecialtyDTO.Params): Promise<DeleteSpecialtyDTO.Result>;
}
