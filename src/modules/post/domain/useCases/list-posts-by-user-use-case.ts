import { AppError } from '@shared/errors/app-error';

import { UserRepository } from '@user/infra/repositories/user-repository';

import { PostRepository } from '@post/infra/repositories/post-repository';

import { Post } from '../entities/post';

namespace ListPostsDTO {
  export type Params = {
    publisherEmail: string;
    userEmail: string;
  };
  export type Result = Post[];
}
export class ListPostsByUserUseCase {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly userRepository: UserRepository
  ) {}

  async execute({ publisherEmail, userEmail }: ListPostsDTO.Params): Promise<ListPostsDTO.Result> {
    if (!publisherEmail) {
      throw new AppError('Missing Params!');
    }
    const userFind = this.userRepository.findByEmail({ email: publisherEmail });
    if (!userFind) {
      throw new AppError('User Not Found!');
    }
    const posts = await this.postRepository.listByUserPage(publisherEmail, userEmail);

    return posts;
  }
}
