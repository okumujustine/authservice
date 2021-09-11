import FacebookService from '@modules/users/services/FacebookService';
import GoogleService from '@modules/users/services/GoogleService';
import JwtService from '@modules/users/services/JwtService';
import LoginUserService from '@modules/users/services/LoginUserService';
import AppError from '@shared/errors/AppError';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';


export default class LoginUserController {
    public async login(req: Request, res: Response){
        const { username_email, password } = req.body;

        const loginUser = container.resolve(LoginUserService);
        const jwtService = container.resolve(JwtService);


        const userObject = await loginUser.execute({
            username_email,
            password,
          });

          const token = await jwtService.executeSign({
            id: userObject.user.id,
            username:userObject.user.username,
            email:userObject.user.email
          })

          req.session = {jwt:token};

        return res.status(200).json(classToClass(userObject.user));
    }

    public async googleLogin(req: Request, res: Response){
      const googleService = container.resolve(GoogleService);
      
      const { googleToken } = req.body;

      try{
        const verifiedUser = await googleService.executeVerifyToken(googleToken)
      
        if(!verifiedUser.payload?.email_verified){
          throw new AppError('Invalid email address')
        }
  
        return res.status(200).json({ userVerified:true })
      }catch(err){
        throw new AppError("Invalid google token, try again later", 400);
      }
    }


    public async facebookLogin(req: Request, res: Response){
      const facebookService = container.resolve(FacebookService);
      
      const { facebookToken, userId } = req.body;

      try{
        const verifiedUser = await facebookService.executeVerifyToken(facebookToken, userId)
  
        return res.status(200).json({ userVerified:verifiedUser })
      }catch(err){
        throw new AppError("Invalid facebook token, try again later", 400);
      }
    }
}