
import { Request, Response } from 'express';

export default class ResetPasswordController {
    public async reset(req: Request, res: Response) {
        const { token, userId } = req.params
        const { password } = req.body

        console.log(token, userId)
        console.log(password)

        console.log("reset it")
        return res.status(201).json({ ok: true });
    }
}