import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import crypto from "crypto"

import ITokenRepository from "../repositories/ITokenRepository";
import IUserRepository from "../repositories/IUserRepository";
import { IEmailProvider } from "../providers/email/IEmailProvider";

interface PasswordRecoveryRequest {
    email: string;
}

@injectable()
class SendEmailPasswordRecoveryService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,

        @inject('TokenRepository')
        private tokenRepository: ITokenRepository,

        @inject('EmailProvider')
        private emailProvider: IEmailProvider,
    ) { }


    public async execute({ email }: PasswordRecoveryRequest): Promise<void> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new AppError('User does not exist.', 401);
        }

        const userToken = await this.tokenRepository.findByUserId(user.id)

        let finalToken
        finalToken = userToken?.token

        if (!userToken) {
            const newToken = await this.tokenRepository.createToken({
                user: user.id,
                token: crypto.randomBytes(32).toString("hex"),
            })

            finalToken = newToken.token
        }


        try {
            const fromEmail = process.env.EMAIL_CLIENT_EMAIL as string;

            const link = `<p>${process.env.BASE_URL}/reset-password/${user.id}/${finalToken}</p>`;

            const mailOptions = {
                from: fromEmail,
                to: email,
                subject: 'Password Reset',
                html: link
            }

            await this.emailProvider.sendEmail(mailOptions)

        } catch (err) {
            throw new AppError("Password reset failed", 400)
        }
    }

}

export default SendEmailPasswordRecoveryService