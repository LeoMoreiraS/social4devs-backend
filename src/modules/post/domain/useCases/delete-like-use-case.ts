import { AppError } from '@shared/errors/app-error';

import { IUserRepository } from '@user/domain/repositories/user-repository';

import { ILikeRepository } from '../repositories/like-repository';
import { IPostRepository } from '../repositories/post-repository';

namespace DeleteLikeDTO {
  export type Params = {
    postEmail: string;
    postBody: string;
    userEmail: string;
  };
}

export class DeleteLikeUseCase {
  constructor(
    private readonly postRepository: IPostRepository,
    private readonly userRepository: IUserRepository,
    private readonly likeRepository: ILikeRepository
  ) {}

  async execute({ postEmail, userEmail, postBody }: DeleteLikeDTO.Params): Promise<void> {
    if (!postEmail || !userEmail || !postBody) {
      throw new AppError('Missing Params!');
    }
    const userFind = this.userRepository.findByEmail({ email: userEmail });
    if (!userFind) {
      throw new AppError('Liker Email Not Found!');
    }
    const postFind = this.postRepository.find({ email: postEmail, body: postBody });
    if (!postFind) {
      throw new AppError('Post Not Found!');
    }
    this.likeRepository.delete({ postEmail, userEmail, postBody });
  }
}
