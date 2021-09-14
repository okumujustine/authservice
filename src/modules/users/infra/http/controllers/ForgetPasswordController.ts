import SendEmailPasswordRecoveryService from '@modules/users/services/SendEmailPasswordRecoveryService';
import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ForgetPasswordController {
    public async sendForgetPasswordEmail(req: Request, res: Response) {
        const { email } = req.body;

        if (!email) {
            throw new AppError('Email is required', 400);
        }

        const sendEmailPasswordRecoveryEmail = container.resolve(
            SendEmailPasswordRecoveryService,
        );

        await sendEmailPasswordRecoveryEmail.execute({
            email,
        });

        return res.status(200).json({ message: 'Email successfully sent' });
    }
}