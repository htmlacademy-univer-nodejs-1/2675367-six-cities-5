export const Config = {
  PORT: process.env.PORT || '3000',
  UPLOAD_DIR: process.env.UPLOAD_DIR || 'uploads',
} as const;
