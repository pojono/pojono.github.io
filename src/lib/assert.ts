import { StandardRestApiError } from './standard.rest.api.error';
import { RestApiError } from './rest.api.error';

export class Assert {
  public static isNotExist<T>(object: T, error: StandardRestApiError): void {
    if (!!object) {
      throw RestApiError.createHttpException(error);
    }
  }
}
