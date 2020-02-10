import * as crypto from 'crypto';
import * as config from 'config';
import { Logger } from '@nestjs/common';

export function routerLogger(req, res, next) {
  const requestId: string = crypto.randomBytes(6).toString('base64');
  const logger = new Logger(requestId);

  req.locals = {};
  req.locals.requestId = requestId;

  const body =
    req.body && Object.keys(req.body).length > 0
      ? JSON.stringify(req.body)
      : '';

  if (config.get('logs.showHeaders')) {
    const headers = JSON.stringify(req.headers);
    logger.log(`Headers: ${headers}`);
  }

  logger.log(`${req.method} ${req.originalUrl} ${body}`);

  next();
}
