
import { Request, Response } from 'express';

export default class CurrentUserController {

public async user(req: Request, res: Response) {
     return res.status(200).json({user: req.currentUser || null});
}

public async logout(req: Request, res: Response) {
    req.session = null;
    return res.status(200).json({message: 'Logout success'})
}
}