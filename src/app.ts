import cors from 'cors';
import dotenv from 'dotenv';
import express, { Response, Request, NextFunction } from 'express';
import 'express-async-errors';
import { Client } from 'memjs';

import { AppError } from '@shared/errors/app-error';
import { router } from '@shared/infra/http/routes';

dotenv.config();

const app = express();
const memcached = Client.create();
app.use(cors());
app.use(express.json());

app.use(router);
app.get('/', (req, res) => {
  return res.render('OI');
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }

  return response.status(500).json({
    message: `Internal server error - ${err.message}`,
  });
});

export { app };
