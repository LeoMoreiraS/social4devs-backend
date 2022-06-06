import { AppError } from '@shared/errors/app-error';

import { UserRepository } from '@user/infra/repositories/user-repository';

import { PostRepository } from '@post/infra/repositories/post-repository';

import { Post } from '../entities/post';

export class ListPostsByUserUseCase {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly userRepository: UserRepository
  ) {}

  async execute(email: string): Promise<Post[]> {
    if (!email) {
      throw new AppError('Missing Params!');
    }
    const userFind = this.userRepository.findByEmail({ email });
    if (!userFind) {
      throw new AppError('User Not Found!');
    }
    const posts = await this.postRepository.list(email);

    return posts;
  }
}
