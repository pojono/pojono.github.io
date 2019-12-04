import { StandardRestApiError } from './standard.rest.api.error';

// STATUS CODE 400 IS RESERVED FOR VALIDATION

export const INVALID_CREDENTIALS: StandardRestApiError = StandardRestApiError.create(
  1001,
  'Invalid credentials',
);

export const AMAZON_COGNITO_ERROR: StandardRestApiError = StandardRestApiError.create(
  1002,
  'Amazon Cognito Error',
);
