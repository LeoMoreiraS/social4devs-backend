import { AppError } from '@shared/errors/app-error';

import { UserRepository } from '@user/infra/repositories/user-repository';

import { PostRepository } from '@post/infra/repositories/post-repository';

namespace DeletePostDTO {
  export type Params = {
    email: string;
    body: string;
  };
}
export class DeletePostUseCase {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly userRepository: UserRepository
  ) {}

  async execute({ email, body }: DeletePostDTO.Params): Promise<void> {
    if (!email || !body) {
      throw new AppError('Missing Params!');
    }
    const userFind = this.userRepository.findByEmail({ email });
    if (!userFind) {
      throw new AppError('Publisher Email Not Found!');
    }

    const postAlreadyExists = await this.postRepository.find({
      email,
      body,
    });

    if (!postAlreadyExists) {
      throw new AppError('Publicação não encontrada!');
    }

    await this.postRepository.delete({
      email,
      body,
    });
  }
}
