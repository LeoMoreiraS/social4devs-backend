import { Response, Request } from 'express';

import { AppError } from '@shared/errors/app-error';

import { UserRepository } from '@user/infra/repositories/user-repository';

import { CreateCommentaryUseCase } from '@post/domain/useCases/create-commentary-use-case';
import { CommentaryRepository } from '@post/infra/repositories/commentary-repository';
import { PostRepository } from '@post/infra/repositories/post-repository';

export class CreateCommentaryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { postEmail, postBody, commentary } = request.body;

    const { email } = response.locals.decodedToken;
    const postRepository = new PostRepository();
    const userRepository = new UserRepository();
    const commentaryRepository = new CommentaryRepository();

    const commentaryAlreadyExists = await commentaryRepository.find({
      postEmail,
      commentary,
      userEmail: email,
      postBody,
    });
    if (commentaryAlreadyExists) {
      throw new AppError('Comentário já existe!');
    }

    const createCommentaryUseCase = new CreateCommentaryUseCase(
      postRepository,
      userRepository,
      commentaryRepository
    );

    const result = await createCommentaryUseCase.execute({
      postEmail,
      postBody,
      userEmail: email,
      commentary,
    });

    return response.status(201).json(result);
  }
}
