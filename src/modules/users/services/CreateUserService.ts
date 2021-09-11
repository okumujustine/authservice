import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import ICreateUserDTO from "../dtos/ICreateUserDTO";
import User from "../infra/database/entities/User";
import IHashProvider from '../providers/HashProvider/IHashProvider';
import IUserRepository from '../repositories/IUserRepository';

@injectable()
class CreateUserService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ){}

    public async execute({ username, email, password }: ICreateUserDTO): Promise<User> {
      const checkUserExists = await this.userRepository.findByEmail(email);
      const checkUsernameExists = await this.userRepository.findByUsername(username);

      if (checkUsernameExists) {
        throw new AppError(
          `User with the username ${username} already exists.`,
        );
      }

      if (checkUserExists) {
        throw new AppError(
          `User with the email ${email} already exists.`,
        );
      }
    const hashedPassword = await this.hashProvider.generateHash(password);

     const user = await this.userRepository.create({
        username,
        email,
        password:hashedPassword,
      });
  
      return user;
    }
}

export default CreateUserService;