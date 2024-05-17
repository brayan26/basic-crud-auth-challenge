import Credentials from '@context/auth/domain/class/Credentials';
import { ICredentialRepository } from '@context/shared/domain/contracts/ICredentialRepository';

export class GetUserByEmail {
  private repository: ICredentialRepository;

  constructor(repository: ICredentialRepository) {
    this.repository = repository;
  }

  async run(email: string): Promise<Credentials> {
    return this.repository.getUserByEmail(email);
  }
}
