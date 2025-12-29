import express, { Express, Router } from 'express';
import fs from 'node:fs';
import { Config } from '../../config/config.js';
import { IExceptionFilter } from '../exception-filter/index.js';

export class Application {
  private expressApp: Express;

  constructor(private readonly exceptionFilter: IExceptionFilter) {
    this.expressApp = express();
  }

  public initRoutes(routers: { path: string; router: Router }[]): void {
    for (const { path, router } of routers) {
      this.expressApp.use(path, router);
    }
  }

  public initMiddleware(): void {
    this.expressApp.use(express.json());

    try {
      const uploadDir = Config.UPLOAD_DIR;
      if (uploadDir) {
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        this.expressApp.use('/uploads', express.static(uploadDir));
      }
    } catch (err) {
      // ignore errors creating/serving upload dir
    }
  }

  public registerMiddleware(middleware: express.RequestHandler): void {
    this.expressApp.use(middleware);
  }

  public initExceptionFilters(): void {
    this.expressApp.use(
      (error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
        this.exceptionFilter.catch(error, req, res, next);
      }
    );
  }

  public async init(routers?: { path: string; router: Router }[]): Promise<void> {
    this.initMiddleware();
    if (routers) {
      this.initRoutes(routers);
    }
    this.initExceptionFilters();

    const port = parseInt(Config.PORT, 10);
    this.expressApp.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}
