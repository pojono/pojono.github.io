import { StandardRestApiError } from './standard.rest.api.error';
import { HttpException, HttpStatus } from '@nestjs/common';

export class RestApiError {
  public static createHttpException(
    error: StandardRestApiError,
  ): HttpException {
    return new HttpException(
      {
        statusCode: error.getCode(),
        error: error.getMessage(),
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
