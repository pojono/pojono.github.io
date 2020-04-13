import { StandardRestApiError } from './standard.rest.api.error';
import { RestApiError } from './rest.api.error';

export class ErrorIf {
  public static isEmpty<T>(
    value: T | undefined | null,
    error: StandardRestApiError,
  ): T {
    if (value === null || value === undefined) {
      throw RestApiError.createHttpException(error);
    }

    return value;
  }

  public static isFalse(
    expression: boolean,
    error: StandardRestApiError,
  ): void {
    if (!expression) {
      throw RestApiError.createHttpException(error);
    }
  }

  public static isTrue(expression: boolean, error: StandardRestApiError): void {
    if (expression) {
      throw RestApiError.createHttpException(error);
    }
  }

  public static notExist<T>(object: T, error: StandardRestApiError): void {
    if (!object) {
      throw RestApiError.createHttpException(error);
    }
  }

  public static isExist<T>(object: T, error: StandardRestApiError): void {
    if (!!object) {
      throw RestApiError.createHttpException(error);
    }
  }
}
