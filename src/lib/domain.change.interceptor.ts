import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as config from 'config';
import { logger } from './logger';

// main.ts 133 line
// app.useGlobalInterceptors(new DomainChangeInterceptor());

@Injectable()
export class DomainChangeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const args = context.getArgByIndex(0);
    const headers = args.headers;
    const requestId = args.locals && args.locals.requestId;
    const host = headers.host;
    logger(requestId).log('HOST: ' + host); // tslint:disable-line

    const requestFrom: string = config.get('domainChange.requestFrom');
    const changeFrom: string = config.get('domainChange.changeFrom');
    const changeTo: string = config.get('domainChange.changeTo');

    const shouldChange = host.includes(requestFrom);

    return (
      next &&
      next.handle().pipe(
        map(value => {
          const response =
            shouldChange && value
              ? JSON.parse(
                  JSON.stringify(value)
                    .split(changeFrom)
                    .join(changeTo),
                )
              : value;
          logger(requestId).log(JSON.stringify(response));
          return response;
        }),
      )
    );
  }
}
