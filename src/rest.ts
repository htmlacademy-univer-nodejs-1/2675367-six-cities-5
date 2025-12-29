import { Application } from './core/index.js';
import { ExceptionFilter } from './core/exception-filter/index.js';
import { UserController } from './controllers/index.js';
import { OfferController } from './controllers/index.js';
import { FavoriteController } from './controllers/index.js';
import { CommentController } from './controllers/index.js';
import { createUserRouter } from './routes/index.js';
import { createOfferRouter } from './routes/index.js';
import { createFavoriteRouter } from './routes/index.js';
import { createCommentRouter } from './routes/index.js';
import { UserService } from './services/index.js';
import { OfferService } from './services/index.js';
import { CommentService } from './services/index.js';

async function bootstrap(): Promise<void> {
  const userService = {} as UserService;
  const offerService = {} as OfferService;
  const commentService = {} as CommentService;

  const exceptionFilter = new ExceptionFilter();
  const app = new Application(exceptionFilter);

  // Создаем контроллеры
  const userController = new UserController(userService);
  const offerController = new OfferController(offerService);
  const favoriteController = new FavoriteController(offerService);

  // Создаем роутеры
  const userRouter = createUserRouter(userController);
  const offerRouter = createOfferRouter(offerController);
  const favoriteRouter = createFavoriteRouter(favoriteController);
  const commentController = new CommentController(commentService);
  const commentRouter = createCommentRouter(commentController);

  await app.init([
    { path: '/api/users', router: userRouter },
    { path: '/api/offers', router: offerRouter },
    { path: '/api/offers', router: commentRouter },
    { path: '/api/users/favorites', router: favoriteRouter },
  ]);
}

async function main(): Promise<void> {
  try {
    await bootstrap();
  } catch (error) {
    console.error('Failed to start application:', error);
    throw error;
  }
}

main().catch((error) => {
  console.error('Unexpected error:', error);
  throw error;
});
