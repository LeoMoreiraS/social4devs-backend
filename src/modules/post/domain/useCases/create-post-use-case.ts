import { AppError } from '@shared/errors/app-error';

import { UserRepository } from '@user/infra/repositories/user-repository';

import { PostRepository } from '@post/infra/repositories/post-repository';

import { Post } from '../entities/post';

namespace CreatePostDTO {
  export type Params = {
    email: string;
    body: string;
  };

  export type Result = Post;
}
export class CreatePostUseCase {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly userRepository: UserRepository
  ) {}

  async execute({ email, body }: CreatePostDTO.Params): Promise<CreatePostDTO.Result> {
    if (!email || !body) {
      throw new AppError('Missing Params!');
    }
    const userFind = this.userRepository.findByEmail({ email });
    if (!userFind) {
      throw new AppError('Publisher Email Not Found!');
    }
    const post = await this.postRepository.create({
      email,
      body,
    });
    post.likes = [];
    return post;
  }
}
