import { createParamDecorator } from '@nestjs/common';

export const GetRequestId = createParamDecorator((data, req): string => {
  return req.locals.requestId;
});
