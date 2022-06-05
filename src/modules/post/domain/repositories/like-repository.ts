import { CreateLikeDTO } from './dtos/create-like-dto';

export interface ILikeRepository {
  create(params: CreateLikeDTO.Params): Promise<void>;
}
