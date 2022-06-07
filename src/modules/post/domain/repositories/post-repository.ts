import { Post } from '../entities/post';
import { CreatePostDTO } from './dtos/create-post-dto';
import { FindPostDTO } from './dtos/find-post-dto';

export interface IPostRepository {
  create(params: CreatePostDTO.Params): Promise<CreatePostDTO.Result>;
  listMainPage(userEmail: string): Promise<Post[]>;
  find(params: FindPostDTO.Params): Promise<FindPostDTO.Result>;
}
