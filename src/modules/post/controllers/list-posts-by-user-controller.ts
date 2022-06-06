import { Response, Request } from 'express';

import { UserRepository } from '@user/infra/repositories/user-repository';

import { ListPostsByUserUseCase } from '@post/domain/useCases/list-posts-by-user-use-case';
import { PostRepository } from '@post/infra/repositories/post-repository';

export class ListPostsByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.params;

    const postRepository = new PostRepository();
    const userRepository = new UserRepository();
    const listPostsByUserUseCase = new ListPostsByUserUseCase(postRepository, userRepository);

    const result = await listPostsByUserUseCase.execute(email);

    return response.status(201).json(result);
  }
}
