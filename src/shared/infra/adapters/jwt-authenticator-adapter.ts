import { sign, SignOptions, verify } from 'jsonwebtoken';

import {
  CreateTokenDTO,
  IAuthenticatorAdapter,
  VerifyTokenDTO,
} from '@shared/adapters/authenticator-adapter';
import { UnauthorizedError } from '@shared/errors/unauthorized-error';

export class JwtAuthenticatorAdapter implements IAuthenticatorAdapter {
  async createToken({
    payload,
    secret,
    options,
  }: CreateTokenDTO.Params): Promise<CreateTokenDTO.Result> {
    let standardSecret: string;
    let standardOptions: SignOptions;

    if (secret) {
      standardSecret = secret;
    } else if (process.env.JWT_SECRET) {
      standardSecret = process.env.JWT_SECRET;
    } else {
      throw new UnauthorizedError('Invalid JWT secret');
    }

    if (options) {
      standardOptions = options as SignOptions;
    } else {
      standardOptions = {
        expiresIn: '1h',
      };
    }

    const token = sign(payload, standardSecret, standardOptions);

    return { token };
  }

  async verifyToken({ token, secret }: VerifyTokenDTO.Params): Promise<VerifyTokenDTO.Result> {
    let standardSecret: string;

    if (secret) {
      standardSecret = secret;
    } else if (process.env.JWT_SECRET) {
      standardSecret = process.env.JWT_SECRET;
    } else {
      throw new UnauthorizedError('Invalid JWT secret');
    }

    try {
      const decodedToken = verify(token.toString(), standardSecret);
      return { decodedToken };
    } catch (err) {
      console.log(err);
      const error = err as Error;
      throw new UnauthorizedError(error.message);
    }
  }
}
