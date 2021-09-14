import { container } from 'tsyringe';
import { IEmailProvider } from './email/IEmailProvider';
import EmailProvider from './email/implementation/EmailProvider';
import IFacebookProvider from './facebook/IFacebookProvider';
import FacebookProvider from './facebook/implementation/FacebookProvider';
import IGoogleProvider from './google/IGoogleProvider';
import GoogleProvider from './google/implementation/GoogleProvider';
import IHashProvider from './HashProvider/IHashProvider';


import HashProvider from './HashProvider/implementation/HashProvider';
import IJwtProvider from './jwt/IJwtProvider';
import JwtProvider from './jwt/implementation/JwtProvider';
import UsernameGeneratorProvider from './UsernameGenerator/implementation/UsernameGeneratorProvider';
import IUsernameGeneratorProvider from './UsernameGenerator/IUsernameGeneratorProvider';

container.registerSingleton<IUsernameGeneratorProvider>('UsernameGeneratorProvider', UsernameGeneratorProvider);
container.registerSingleton<IHashProvider>('HashProvider', HashProvider);
container.registerSingleton<IJwtProvider>('JwtProvider', JwtProvider);
container.registerSingleton<IGoogleProvider>('GoogleProvider', GoogleProvider);
container.registerSingleton<IFacebookProvider>('FacebookProvider', FacebookProvider);
container.registerSingleton<IEmailProvider>('EmailProvider', EmailProvider);