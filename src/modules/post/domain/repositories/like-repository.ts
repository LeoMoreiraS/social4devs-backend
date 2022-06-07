import { CreateLikeDTO } from './dtos/create-like-dto';
import { DeleteLikeDTO } from './dtos/delete-like-dto';

export interface ILikeRepository {
  create(params: CreateLikeDTO.Params): Promise<void>;
  delete(params: DeleteLikeDTO.Params): Promise<void>;
}
