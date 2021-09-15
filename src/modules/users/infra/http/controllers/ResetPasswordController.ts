
import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ResetPasswordController {
    public async reset(req: Request, res: Response) {
        const { token, userId } = req.params
        const { password, password2 } = req.body

        const resetPasswordService = container.resolve(ResetPasswordService);

        await resetPasswordService.execute({ token, userId, password, password2 });

        return res.status(201).json({ message: "Password successfully updated, login" });
    }
}