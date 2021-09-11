import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class CreateUserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { username, email, password } = req.body;

    const createUser = container.resolve(CreateUserService);

    
  const user = await createUser.execute({
    username,
    email,
    password,
  });
  return res.json(classToClass(user));
  }
}
