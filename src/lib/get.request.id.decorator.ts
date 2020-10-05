import { createParamDecorator, Logger } from '@nestjs/common';

export const GetRequestId = createParamDecorator((data, req): string => {
  const requestId: string =
    req && req.locals && req.locals.requestId
      ? req.locals.requestId
      : 'DECREQERR';
  const logger = new Logger(requestId);

  const body =
    req.body && Object.keys(req.body).length > 0
      ? JSON.stringify(req.body)
      : '';

  const userId = req.user ? req.user.id : '?';
  logger.log(
    `UserId: ${userId}. Req: ${req.method} ${req.originalUrl} ${body}`,
  );

  return requestId;
});
