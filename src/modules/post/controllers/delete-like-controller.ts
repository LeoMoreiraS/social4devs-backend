import { Response, Request } from 'express';

import { UserRepository } from '@user/infra/repositories/user-repository';

import { DeleteLikeUseCase } from '@post/domain/useCases/delete-like-use-case';
import { LikeRepository } from '@post/infra/repositories/like-repository';
import { PostRepository } from '@post/infra/repositories/post-repository';

export class DeleteLikeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { postEmail, postBody } = request.body;

    const { email } = response.locals.decodedToken;
    const postRepository = new PostRepository();
    const userRepository = new UserRepository();
    const likeRepository = new LikeRepository();
    const deleteLikeUseCase = new DeleteLikeUseCase(postRepository, userRepository, likeRepository);

    const result = await deleteLikeUseCase.execute({ postEmail, postBody, userEmail: email });

    return response.status(200).json(result);
  }
}
