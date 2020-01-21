import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { logger } from './logger';
import { Telegram } from './telegram';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const messageObject: any =
      exception instanceof HttpException ? exception.getResponse() : {};

    const customException: any = exception;
    let stack = customException.stack
      ? customException.stack
      : 'Stack not found';

    let message;
    if (messageObject.error) {
      message = messageObject.error;
    }

    let statusCode;
    if (messageObject.statusCode) {
      statusCode = messageObject.statusCode;
    }

    const errorMessage: string = message || 'Internal Server Error';
    const statusCodeResponse: number = statusCode || status;

    const responseObject: any = {
      success: false,
      timestamp: new Date(),
      requestId: request.locals.requestId,
      statusCode: statusCodeResponse,
      error: errorMessage,
    };

    // Validation
    if (messageObject.message) {
      responseObject.message = messageObject.message;
      responseObject.error = 'Validation Error';
      stack += `\n\n${JSON.stringify(messageObject.message)}`;
    }

    if (statusCodeResponse === 404) {
      responseObject.error = 'Not Found';
    }

    // FOR TELEGRAM
    const body =
      request.body && Object.keys(request.body).length > 0
        ? ` ${JSON.stringify(request.body)}`
        : '';
    const requestInfo: string = `${request.method} ${request.originalUrl}${body}`;

    let userId: string = '?';
    if (request.user) {
      userId = request.user.id;
    }

    const codeAndError: string = `${statusCodeResponse} ${responseObject.error}`;

    logger(responseObject.requestId).error(codeAndError);
    logger(responseObject.requestId).error(stack);

    const telegramMessage: string = `⚠ ${codeAndError} ${requestInfo} UserId: ${userId}`;

    (async () => {
      await Telegram.sendMessage(telegramMessage, responseObject.requestId);
    })();

    logger(responseObject.requestId).log(telegramMessage);

    response.status(status).json(responseObject);
  }
}
