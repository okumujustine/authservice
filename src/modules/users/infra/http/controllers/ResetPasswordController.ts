
import { Request, Response } from 'express';

export default class ResetPasswordController {
    public async reset(req: Request, res: Response) {
        console.log("reset it")
        return res.status(201).json({ ok: true });
    }
}