import dotenv from 'dotenv';
import express, { Response, Request } from 'express';
import 'express-async-errors';

import { AppError } from '@shared/errors/app-error';
import { router } from '@shared/infra/http/routes';

dotenv.config();

const app = express();

app.use(express.json());

app.use(router);

app.use((err: Error, request: Request, response: Response) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  });
});

export { app };
