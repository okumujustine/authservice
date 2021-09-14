
import { container } from 'tsyringe';
import '@modules/users/providers/';

import UserRepository from '@modules/users/infra/database/repositories/UserRepository';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import TokenRepository from '@modules/users/infra/database/repositories/TokenRepository';
import ITokenRepository from '@modules/users/repositories/ITokenRepository';

container.registerSingleton<IUsersRepository>(
    'UserRepository',
    UserRepository,
);

container.registerSingleton<ITokenRepository>(
    'TokenRepository',
    TokenRepository,
);