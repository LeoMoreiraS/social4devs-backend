import { Client } from 'memjs';

import { AppError } from '@shared/errors/app-error';

import { UserRepository } from '@user/infra/repositories/user-repository';

import { PostRepository } from '@post/infra/repositories/post-repository';

import { Post } from '../entities/post';

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export class ListPostsTimelineUseCase {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly userRepository: UserRepository
  ) {}

  async execute(email: string): Promise<Post[]> {
    console.log(email);
    const memcached = Client.create();

    if (!email) {
      throw new AppError('Missing Params!');
    }
    const userFind = this.userRepository.findByEmail({ email });
    if (!userFind) {
      throw new AppError('User Not Found!');
    }
    const mainPageCached = await memcached.get(`@MainPage-${email}`);

    if (mainPageCached.value) {
      const buff = mainPageCached.value.toString();
      console.log('CACHE DE TIMELINE', JSON.parse(buff));
      return JSON.parse(buff);
    }

    await sleep(10000);

    const posts = await this.postRepository.listMainPage(email);

    console.log('SETANDO CACHE DE TIMELINE');
    memcached.set(`@MainPage-${email}`, JSON.stringify(posts), { expires: 60 * 5 });

    return posts;
  }
}
