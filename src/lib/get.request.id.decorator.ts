import { createParamDecorator, Logger } from '@nestjs/common';

export const GetRequestId = createParamDecorator((data, req): string => {
  const logger = new Logger(req.locals.requestId);
  const userId = req.user ? req.user.id : '?';
  logger.log('UserId: ' + userId);
  return req.locals.requestId;
});
