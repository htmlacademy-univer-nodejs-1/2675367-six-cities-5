import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { nanoid } from 'nanoid';
import mime from 'mime-types';
import { Config } from '../config/config.js';

export class UploadMiddleware {
  private uploadDir: string;

  constructor(uploadDir?: string) {
    this.uploadDir = uploadDir ?? Config.UPLOAD_DIR;
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  public single(fieldName: string) {
    const storage = multer.diskStorage({
      destination: (_req, _file, cb) => cb(null, this.uploadDir),
      filename: (_req, file, cb) => {
        const ext = mime.extension(file.mimetype) || path.extname(file.originalname).replace('.', '') || '';
        const fileName = ext ? `${nanoid()}.${ext}` : nanoid();
        cb(null, fileName);
      }
    });

    return multer({ storage }).single(fieldName);
  }
}
