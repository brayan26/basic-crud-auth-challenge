import StatusCodes from 'http-status-codes';
import { BaseError } from '@context/shared/domain/class/BaseError';

export class GenericNotFoundError extends BaseError {
  constructor(message: string, info: { error: string, code?: string } = { error: message }, status: number = StatusCodes.NOT_FOUND) {
    super(message, status, info);
  }
}
