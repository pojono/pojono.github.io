import { Logger } from '@nestjs/common';

export function logger(context) {
  return new Logger(context);
}
