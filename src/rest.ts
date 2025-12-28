import { Application } from './core/index.js';
import { ExceptionFilter } from './core/exception-filter/index.js';
import { UserController } from './controllers/index.js';
import { OfferController } from './controllers/index.js';
import { FavoriteController } from './controllers/index.js';
import { createUserRouter } from './routes/index.js';
import { createOfferRouter } from './routes/index.js';
import { createFavoriteRouter } from './routes/index.js';
import { UserService } from './services/index.js';
import { OfferService } from './services/index.js';
import { CommentService } from './services/index.js';
// TODO: Импортировать реальные модели, когда они будут реализованы
// import { UserModel } from './models/mongodb/user.model.js';
// import { OfferModel } from './models/mongodb/offer.model.js';
// import { CommentModel } from './models/mongodb/comment.model.js';

async function bootstrap(): Promise<void> {
  // TODO: Инициализировать реальные модели
  // const userModel = new UserModel();
  // const offerModel = new OfferModel();
  // const commentModel = new CommentModel();

  // TODO: Создать реальные сервисы с моделями
  // const userService = new UserService(userModel);
  // const offerService = new OfferService(offerModel, commentModel);
  // const commentService = new CommentService(commentModel, offerService);

  // Временные заглушки для сервисов
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

  // Инициализируем приложение с роутерами
  await app.init([
    { path: '/api/users', router: userRouter },
    { path: '/api/offers', router: offerRouter },
    { path: '/api/users/favorites', router: favoriteRouter },
  ]);
}

bootstrap().catch((error) => {
  console.error('Failed to start application:', error);
  process.exit(1);
});

