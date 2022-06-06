import { Response, Request } from 'express';

import { UserRepository } from '@user/infra/repositories/user-repository';

import { CreateLikeUseCase } from '@post/domain/useCases/create-like-use-case';
import { LikeRepository } from '@post/infra/repositories/like-repository';
import { PostRepository } from '@post/infra/repositories/post-repository';

export class CreateLikeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { postEmail, postBody, userEmail } = request.body;

    const postRepository = new PostRepository();
    const userRepository = new UserRepository();
    const likeRepository = new LikeRepository();
    const createLikeUseCase = new CreateLikeUseCase(postRepository, userRepository, likeRepository);

    const result = await createLikeUseCase.execute({ postEmail, postBody, userEmail });

    return response.status(201).json(result);
  }
}
