import { Response, Request, NextFunction } from 'express';

import { UnauthorizedError } from '@shared/errors/unauthorized-error';
import { JwtAuthenticatorAdapter } from '@shared/infra/adapters/jwt-authenticator-adapter';

export class AuthorizationMiddleware {
  async verifyToken(request: Request, response: Response, next: NextFunction) {
    const authenticatorAdapter = new JwtAuthenticatorAdapter();

    const { token } = request.headers;

    if (!token) {
      throw new UnauthorizedError('Token is required');
    }

    const { decodedToken } = await authenticatorAdapter.verifyToken({
      token: token.toString(),
    });
    response.locals.decodedToken = decodedToken;

    next();
  }
}
