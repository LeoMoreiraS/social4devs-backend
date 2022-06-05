import { Response, Request, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '@shared/errors/app-error';

export function verifyToken(request: Request, response: Response, next: NextFunction) {
  const { token } = request.headers;

  if (!token) {
    throw new AppError('Token is required');
  }

  const secret = process.env.JWT_SECRET ?? 'secret';
  const decodedToken = verify(token.toString(), secret);
  response.locals.decodedToken = decodedToken;
  next();
}
