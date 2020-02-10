import { Logger } from '@nestjs/common';
import * as crypto from 'crypto';

export function routerLogger(req, res, next) {
  const requestId: string = crypto.randomBytes(6).toString('base64');
  const logger = new Logger(requestId);

  req.locals = {};
  req.locals.requestId = requestId;

  const body =
    req.body && Object.keys(req.body).length > 0
      ? JSON.stringify(req.body)
      : '';
  const headers = JSON.stringify(req.headers);
  logger.log(`Headers: ${headers}`);
  logger.log(`${req.method} ${req.originalUrl} ${body}`);

  next();
}
