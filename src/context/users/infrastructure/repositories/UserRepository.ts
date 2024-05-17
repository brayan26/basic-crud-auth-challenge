import { IUserRepository } from '@context/users/domain/contracts/IUserRepository';
import User from '@context/users/domain/class/User';
import ExternalApi from '@context/shared/infrastructure/adapters/jsonplaceholder/ExternalApi';
import { GenericBadGatewayError } from '@context/shared/domain/errors/GenericBadGatewayError';
import httpStatus from 'http-status';
import { GenericBadRequestError } from '@context/shared/domain/errors/GenericBadRequestError';
import { UserErrors } from '@context/shared/domain/class/UserError';
import { GenericNotFoundError } from '@context/shared/domain/errors/GenericNotFoundError';

export class UserRepository extends ExternalApi implements IUserRepository {
  async createUser(user: User): Promise<void> {
    const response = await this.create(user);


    if (!response) throw new GenericBadGatewayError(
      `<UserRepository - createUser> Error on connect to external API, timeout`,
      UserErrors.timeout);

    if (response.status !== httpStatus.CREATED) throw new GenericBadRequestError(
      `Error creating the new user, detail: ${JSON.stringify(response.data)}`,
      UserErrors.create);
  }

  async getAllUsers(): Promise<User[]> {
    const response = await this.getAll();

    if (!response) throw new GenericBadGatewayError(
      `<UserRepository - getAllUsers> Error on connect to external API, timeout`,
      UserErrors.timeout);

    if (response.status !== httpStatus.OK) throw new GenericBadRequestError(
      `<UserRepository - getAllUsers>  Error getting all users, detail: ${JSON.stringify(response.data)}`,
      UserErrors.findAll);

    return response.data;
  }

  async getUserById(id: string): Promise<User> {
    const response = await this.getById(id);

    if (!response) throw new GenericBadGatewayError(
      `<UserRepository - getUserById> Error on connect to external API, timeout`,
      UserErrors.timeout);

    if (response.status === httpStatus.NOT_FOUND){
      const { status, statusText } = response;
      throw new GenericNotFoundError(
        `<UserRepository - getUserById>  User with id=${id} not found, detail: ${JSON.stringify({ status, statusText})}`,
        UserErrors.userNotFound);
    } 

    if (response.status !== httpStatus.OK) throw new GenericBadRequestError(
      `<UserRepository - getUserById>  Error getting user, detail: ${JSON.stringify(response.data)}`,
      UserErrors.getUserById);

    return response.data;
  }
}
