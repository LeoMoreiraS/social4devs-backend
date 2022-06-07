import { Response, Request } from 'express';

import { UserRepository } from '@user/infra/repositories/user-repository';

import { DeletePostUseCase } from '@post/domain/useCases/delete-post-use-case';
import { PostRepository } from '@post/infra/repositories/post-repository';

export class DeletePostController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { body } = request.body;

    const { email } = response.locals.decodedToken;
    const postRepository = new PostRepository();
    const userRepository = new UserRepository();
    const deletePostUseCase = new DeletePostUseCase(postRepository, userRepository);

    await deletePostUseCase.execute({
      email,
      body,
    });

    return response.status(200).send();
  }
}
