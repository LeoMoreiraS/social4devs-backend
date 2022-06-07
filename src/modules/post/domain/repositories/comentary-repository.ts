import { Commentary } from '../entities/commentary';
import { CreateCommentaryDTO } from './dtos/create-comentary-dto';
import { ListCommentaryDTO } from './dtos/list-comentaries-dto';

export interface ICommentaryRepository {
  create(params: CreateCommentaryDTO.Params): Promise<Commentary>;
  delete(params: CreateCommentaryDTO.Params): Promise<void>;
  find({
    postEmail,
    postBody,
    userEmail,
    commentary,
  }: CreateCommentaryDTO.Params): Promise<Commentary>;
  listByPost({ postEmail, postBody }: ListCommentaryDTO.Params): Promise<ListCommentaryDTO.Result>;
}
