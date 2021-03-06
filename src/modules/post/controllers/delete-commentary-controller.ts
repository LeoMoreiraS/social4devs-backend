import { Response, Request } from 'express';

import { UserRepository } from '@user/infra/repositories/user-repository';

import { CreateCommentaryUseCase } from '@post/domain/useCases/create-commentary-use-case';
import { CommentaryRepository } from '@post/infra/repositories/commentary-repository';
import { PostRepository } from '@post/infra/repositories/post-repository';

export class DeleteCommentaryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { postEmail, postBody, commentary } = request.body;

    const { email } = response.locals.decodedToken;
    const postRepository = new PostRepository();
    const userRepository = new UserRepository();
    const commentaryRepository = new CommentaryRepository();

    const deleteCommentaryUseCase = new CreateCommentaryUseCase(
      postRepository,
      userRepository,
      commentaryRepository
    );

    const result = await deleteCommentaryUseCase.execute({
      postEmail,
      postBody,
      userEmail: email,
      commentary,
    });

    return response.status(200).json(result);
  }
}
