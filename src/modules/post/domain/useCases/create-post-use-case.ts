import { Client } from 'memjs';

import { AppError } from '@shared/errors/app-error';

import { UserRepository } from '@user/infra/repositories/user-repository';

import { PostRepository } from '@post/infra/repositories/post-repository';

import { UserFollowRepository } from '@follow/infra/repositories/user-follow-repository';

import { Post } from '../entities/post';

namespace CreatePostDTO {
  export type Params = {
    email: string;
    body: string;
  };

  export type Result = Post;
}
export class CreatePostUseCase {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly userRepository: UserRepository
  ) {}

  async execute({ email, body }: CreatePostDTO.Params): Promise<CreatePostDTO.Result> {
    if (!email || !body) {
      throw new AppError('Missing Params!');
    }

    const userFind = await this.userRepository.findByEmail({ email });
    if (!userFind) {
      throw new AppError('Publisher Email Not Found!');
    }

    const postAlreadyExists = await this.postRepository.find({
      email,
      body,
    });

    if (postAlreadyExists) {
      throw new AppError('Publicação já existe!');
    }

    const post = await this.postRepository.create({
      email,
      body,
    });
    post.likes = [];

    const updatedPost = await this.postRepository.find({
      email,
      body,
    });
    const userFollowRepository = new UserFollowRepository();
    const followers = await userFollowRepository.findFollowers({ email });

    const memcached = Client.create();
    followers?.push(userFind);
    followers?.forEach(async (follower) => {
      const mainPageCached = await memcached.get(`@MainPage-${follower.email}`);
      if (mainPageCached.value) {
        console.log('ATUALIZANDO TIMELINE DE ', follower.email);
        const posts = await this.postRepository.listMainPage(follower.email);
        memcached.replace(`@MainPage-${follower.email}`, JSON.stringify(posts), {
          expires: 60 * 5,
        });
      }
    });
    return post;
  }
}
