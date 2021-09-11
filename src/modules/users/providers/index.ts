import { container } from 'tsyringe';
import IFacebookProvider from './facebook/IFacebookProvider';
import FacebookProvider from './facebook/implementation/FacebookProvider';
import IGoogleProvider from './google/IGoogleProvider';
import GoogleProvider from './google/implementation/GoogleProvider';
import IHashProvider from './HashProvider/IHashProvider';


import HashProvider from './HashProvider/implementation/HashProvider';
import IJwtProvider from './jwt/IJwtProvider';
import JwtProvider from './jwt/implementation/JwtProvider';

container.registerSingleton<IHashProvider>('HashProvider', HashProvider);
container.registerSingleton<IJwtProvider>('JwtProvider', JwtProvider);
container.registerSingleton<IGoogleProvider>('GoogleProvider', GoogleProvider);
container.registerSingleton<IFacebookProvider>('FacebookProvider', FacebookProvider);