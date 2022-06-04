import { sign } from 'jsonwebtoken';

import { AppError } from '@shared/errors/app-error';

import { IEncrypterAdapter } from '../adapters/encrypter';
import { IUserRepository } from '../repositories/user-repository';

export namespace AuthenticateUserUseCaseDTO {
  export type Params = {
    email: string;
    password: string;
  };

  export type Result = {
    token: string;
  };
}

export class AuthenticateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly encrypterAdapter: IEncrypterAdapter
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserUseCaseDTO.Params): Promise<AuthenticateUserUseCaseDTO.Result> {
    if (!email || !password) {
      throw new AppError('Missing params');
    }

    const user = await this.userRepository.findByEmail({ email });

    if (!user) {
      throw new AppError('Wrong credentials');
    }

    const isPasswordValid = await this.encrypterAdapter.comparePassword({
      plainPassword: password,
      hashedPassword: user.password,
    });

    if (!isPasswordValid) {
      throw new AppError('Wrong credentials');
    }

    const secret = process.env.JWT_SECRET ?? 'secret';
    const expiresIn = process.env.JWT_EXPIRES_IN ?? '1h';

    const token = sign(user, secret, {
      expiresIn,
    });

    return {
      token,
    };
  }
}
