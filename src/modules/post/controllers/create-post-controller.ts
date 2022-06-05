import { Response, Request } from 'express';

import { UserRepository } from '@user/infra/repositories/user-repository';

import { CreatePostUseCase } from '@post/domain/useCases/create-post-use-case';
import { PostRepository } from '@post/infra/repositories/post-repository';

export class CreatePostController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, body } = request.body;

    const postRepository = new PostRepository();
    const userRepository = new UserRepository();
    const createUserUseCase = new CreatePostUseCase(postRepository, userRepository);

    const result = await createUserUseCase.execute({
      email,
      body,
    });

    return response.status(201).json(result);
  }
}
