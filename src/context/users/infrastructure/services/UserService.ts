import { CreateUser } from '@context/users/application/uses_cases/create/CreateUser';
import { GetAllUsers } from '@context/users/application/uses_cases/get/GetAllUsers';
import { GetUserById } from '@context/users/application/uses_cases/get/GetUserById';
import User from '@context/users/domain/class/User';

export class UserService {
  constructor(private createUserUseCase: CreateUser, 
    private getAllUsersUseCase: GetAllUsers, 
    private getUserByIdUseCase: GetUserById) {}

  async createUser(user: User): Promise<void> {
    await this.createUserUseCase.run(user);
  }

  async getAllUsers(): Promise<User[]> {
    return this.getAllUsersUseCase.run();
  }

  async getUserById(id: string): Promise<User> {
    return this.getUserByIdUseCase.run(id);
  }
}
