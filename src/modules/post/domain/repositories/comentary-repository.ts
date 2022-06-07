import { CreateCommentaryDTO } from './dtos/create-comentary-dto';

export interface ICommentaryRepository {
  create(params: CreateCommentaryDTO.Params): Promise<void>;
  delete(params: CreateCommentaryDTO.Params): Promise<void>;
}
