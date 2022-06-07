import { Response, Request } from 'express';

import { UserRepository } from '@user/infra/repositories/user-repository';

import { ListPostsTimelineUseCase } from '@post/domain/useCases/list-posts-timeline-use-case';
import { PostRepository } from '@post/infra/repositories/post-repository';

export class ListPostsTimelineController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = response.locals.decodedToken;
    const postRepository = new PostRepository();
    const userRepository = new UserRepository();
    const listPostsTimelineUseCase = new ListPostsTimelineUseCase(postRepository, userRepository);

    const result = await listPostsTimelineUseCase.execute(email);

    return response.status(200).json(result);
  }
}
