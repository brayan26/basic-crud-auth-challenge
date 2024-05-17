import User from "@context/users/domain/class/User";
import { IUserRepository } from "@context/users/domain/contracts/IUserRepository";

export class GetUserById {
    constructor(private readonly repository: IUserRepository) {
    }

    async run(id: string): Promise<User> {
        return this.repository.getUserById(id);
    }
}