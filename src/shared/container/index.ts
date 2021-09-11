
import { container } from 'tsyringe';
import '@modules/users/providers/';

import UserRepository from '@modules/users/infra/database/repositories/UserRepository';
import IUsersRepository from '@modules/users/repositories/IUserRepository';

container.registerSingleton<IUsersRepository>(
    'UserRepository',
    UserRepository,
);