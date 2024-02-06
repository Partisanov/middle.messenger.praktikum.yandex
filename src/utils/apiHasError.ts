import { APIError } from '../api/type.ts';

export function apiHasError(response: any): response is APIError {
  return response?.reason;
}
