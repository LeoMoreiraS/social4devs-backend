import { Response, Request } from 'express';

import { ListCommentariesUseCase } from '@post/domain/useCases/list-commentaries-use-case';
import { CommentaryRepository } from '@post/infra/repositories/commentary-repository';

export class ListCommentariesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { postEmail, postBody } = request.headers;

    const commentaryRepository = new CommentaryRepository();

    const createCommentaryUseCase = new ListCommentariesUseCase(commentaryRepository);

    const result = await createCommentaryUseCase.execute({
      postEmail: postEmail?.toString() ?? '',
      postBody: postBody?.toString() ?? '',
    });

    return response.status(201).json(result);
  }
}
