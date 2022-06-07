import { AppError } from '@shared/errors/app-error';

import { Commentary } from '../entities/commentary';
import { ICommentaryRepository } from '../repositories/comentary-repository';

namespace ListCommentaryDTO {
  export type Params = {
    postEmail: string;
    postBody: string;
  };
}

export class ListCommentariesUseCase {
  constructor(private readonly commentaryRepository: ICommentaryRepository) {}

  async execute({
    postEmail,

    postBody,
  }: ListCommentaryDTO.Params): Promise<Commentary[]> {
    if (!postEmail || !postBody) {
      throw new AppError('Faltam dados!');
    }
    const commentaries = this.commentaryRepository.listByPost({ postEmail, postBody });
    return commentaries;
  }
}
