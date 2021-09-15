import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IResetPasswordDTO } from "../dtos/IResetPasswordDTO";
import IHashProvider from "../providers/HashProvider/IHashProvider";
import ITokenRepository from "../repositories/ITokenRepository";
import IUserRepository from "../repositories/IUserRepository";

@injectable()
class ResetPasswordService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,

        @inject('TokenRepository')
        private tokenRepository: ITokenRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) { }

    public async execute({ password, password2, token, userId }: IResetPasswordDTO): Promise<any> {

        if (password !== password2) {
            throw new AppError('Passwords do not match', 400)
        }

        try {
            const user = await this.userRepository.findById(userId)

            if (!user) {
                throw new AppError('Invalid or expired link', 400)
            }

            const getToken = await this.tokenRepository.findByUserIdAndToken({
                userId: user.id,
                token,
            });

            if (!getToken) {
                throw new AppError('Invalid or expired link', 400)
            }

            const encryptedPassword = await this.hashProvider.generateHash(password);

            const userUpdated = await this.userRepository.updateUserPassword({
                userId: user.id,
                password: encryptedPassword
            })

            return userUpdated

        } catch (error) {
            throw new AppError('Invalid or expired link', 400)
        }
    }
}

export default ResetPasswordService