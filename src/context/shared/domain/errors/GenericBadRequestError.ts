import StatusCodes from 'http-status-codes';
import { BaseError } from '@context/shared/domain/class/BaseError';

export class GenericBadRequestError extends BaseError {
  constructor(
    message: string,
    info: { error: string, code?: string } = {error: message},
    status: number = StatusCodes.BAD_REQUEST,
  ) {
    super(message, status, info);
  }
}
