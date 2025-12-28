import { RequestHandler } from 'express';
import { IMiddleware } from '../middleware/index.js';

export interface Route {
  path: string;
  method: 'get' | 'post' | 'patch' | 'delete' | 'put';
  handler: RequestHandler;
  middlewares?: IMiddleware[];
}

