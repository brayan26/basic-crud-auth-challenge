import Credentials from '@context/auth/domain/class/Credentials';

export interface ICredentialRepository {
  getUserByEmail(email: string): Promise<Credentials>;
}
