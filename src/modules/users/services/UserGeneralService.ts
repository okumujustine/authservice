import { inject, injectable } from "tsyringe";
import User from "../infra/database/entities/User";
import IUserRepository from "../repositories/IUserRepository";

@injectable()
class UserGeneralService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,

    ) { }

    public async findUserByEmail(email: string): Promise<User | undefined> {
        const user = await this.userRepository.findByEmail(email);
        return user;
    }
}

export default UserGeneralService