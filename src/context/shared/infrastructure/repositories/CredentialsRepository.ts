import { ICredentialRepository } from '@context/shared/domain/contracts/ICredentialRepository';
import Credentials from '@context/auth/domain/class/Credentials';
import config from '@app/config';
import { GenericNotFoundError } from '@context/shared/domain/errors/GenericNotFoundError';

export class CredentialsRepository implements ICredentialRepository {
  async getUserByEmail(email: string): Promise<Credentials> {
    const credentials = config.AUTH_MOCK_DATA;

    if (credentials.USER_MAIL !== email) {
      throw new GenericNotFoundError(`Invalid Email: ${JSON.stringify(email)}`);
    }

    return new Credentials(credentials.USER_MAIL, credentials.USER_PASS, credentials.USER_ID);
  }
}
