import { sign } from 'jsonwebtoken';
import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppError";
import { ILoginUserDTO } from "../dtos/ILoginUserDTO";
import User from "../infra/database/entities/User";
import IHashProvider from "../providers/HashProvider/IHashProvider";
import IUserRepository from "../repositories/IUserRepository";


interface ILoginResponse {
    user: User
}

@injectable()
class LoginUserService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) { }

    public async execute({ username_email, password }: ILoginUserDTO): Promise<ILoginResponse> {
        const theUser = await this.userRepository.findByUsernameOrEmail(username_email);

        if (!theUser) {
            throw new AppError(`User with email or username ${username_email} not found`, 400);
        }

        if (!theUser?.password) {
            throw new AppError(`User registered with oath methods.`, 401);
        }

        const checkPasswordMatch = await this.hashProvider.compareHash(
            password,
            theUser.password,
        );

        if (!checkPasswordMatch) {
            throw new AppError('Invalid username or email and password.', 400);
        }

        return { user: theUser };
    }
}

export default LoginUserService