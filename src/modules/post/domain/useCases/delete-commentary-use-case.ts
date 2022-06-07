import { AppError } from '@shared/errors/app-error';

import { IUserRepository } from '@user/domain/repositories/user-repository';

import { ICommentaryRepository } from '../repositories/comentary-repository';
import { IPostRepository } from '../repositories/post-repository';

namespace DeleteCommentaryDTO {
  export type Params = {
    postEmail: string;
    postBody: string;
    userEmail: string;
    commentary: string;
  };
}

export class DeleteCommentaryUseCase {
  constructor(
    private readonly postRepository: IPostRepository,
    private readonly userRepository: IUserRepository,
    private readonly commentaryRepository: ICommentaryRepository
  ) {}

  async execute({
    postEmail,
    userEmail,
    postBody,
    commentary,
  }: DeleteCommentaryDTO.Params): Promise<void> {
    if (!postEmail || !userEmail || !postBody || !commentary) {
      throw new AppError('Faltam dados!');
    }
    const userFind = this.userRepository.findByEmail({ email: userEmail });
    if (!userFind) {
      throw new AppError('Usuário não encontrado!');
    }
    const postFind = this.postRepository.find({ email: postEmail, body: postBody });
    if (!postFind) {
      throw new AppError('Publicação não encontrada!');
    }
    this.commentaryRepository.delete({ postEmail, userEmail, postBody, commentary });
  }
}
