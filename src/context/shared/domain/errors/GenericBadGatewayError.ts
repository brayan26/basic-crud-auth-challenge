import StatusCodes from 'http-status-codes';
import { BaseError } from '@context/shared/domain/class/BaseError';

export class GenericBadGatewayError extends BaseError {
  constructor(message: string, info: { error: string, code?: string} = { error: message }, status: number = StatusCodes.BAD_GATEWAY) {
    super(message, status, info);
  }
}
