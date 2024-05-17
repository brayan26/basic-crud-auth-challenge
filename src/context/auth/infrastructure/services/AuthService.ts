import Credentials from '@context/auth/domain/class/Credentials';
import { GetUserByEmail } from '@context/shared/application/uses_cases/get/GetUserByEmail';
import httpStatus from 'http-status';
import { sign } from 'jsonwebtoken';
export class AuthService {
  constructor(private getUserByEmailUseCase: GetUserByEmail) {}

  async login(userCredentials: Credentials): Promise<{status: number, token: string}> {
    const credentials = await this.getUserByEmailUseCase.run(userCredentials.email);

    if (credentials.email === userCredentials.email && credentials.password === userCredentials.password) {
      const token = sign({ id: credentials.id, email: credentials.email }, 'secret_key', { expiresIn: '1h' });
      return { status: httpStatus.OK, token };
    }

    return { status: httpStatus.UNAUTHORIZED, token: 'Bad credentials'};
  }
}
