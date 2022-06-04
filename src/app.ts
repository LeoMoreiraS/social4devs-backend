import express, { NextFunction, Response, Request } from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';

import { router } from '@shared/infra/http/routes';

dotenv.config();

const app = express();

app.use(express.json());

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  });
});

export { app };
