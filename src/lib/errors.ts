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

export const SMS_TOO_OFTEN: StandardRestApiError = StandardRestApiError.create(
  1003,
  'Sms request too often',
);

export const OBJECT_NOT_FOUND: StandardRestApiError = StandardRestApiError.create(
  1004,
  'Object not found',
);

export const BEGINNER_COURSE_NOT_FOUND: StandardRestApiError = StandardRestApiError.create(
  1005,
  'Beginner course not found',
);
