import CreateUserService from '@modules/users/services/CreateUserService';
import FacebookService from '@modules/users/services/FacebookService';
import GoogleService from '@modules/users/services/GoogleService';
import JwtService from '@modules/users/services/JwtService';
import LinkedInService from '@modules/users/services/LinkedInService';
import LoginUserService from '@modules/users/services/LoginUserService';
import UserGeneralService from '@modules/users/services/UserGeneralService';
import UsernameService from '@modules/users/services/UsernameService';
import AppError from '@shared/errors/AppError';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';


export default class LoginUserController {
  public async login(req: Request, res: Response) {
    const { username_email, password } = req.body;

    const loginUser = container.resolve(LoginUserService);
    const jwtService = container.resolve(JwtService);


    const userObject = await loginUser.execute({
      username_email,
      password,
    });

    const token = await jwtService.executeSign({
      id: userObject.user.id,
      username: userObject.user.username,
      email: userObject.user.email
    })

    req.session = { jwt: token };

    return res.status(200).json(classToClass(userObject.user));
  }


  public async googleLogin(req: Request, res: Response) {

    const googleService = container.resolve(GoogleService);
    const userGeneralService = container.resolve(UserGeneralService)
    const jwtService = container.resolve(JwtService);
    const usernameService = container.resolve(UsernameService);
    const createUser = container.resolve(CreateUserService);


    const { googleToken } = req.body;

    try {
      const verifiedUser = await googleService.executeVerifyToken(googleToken)

      if (!verifiedUser.payload?.email_verified) {
        throw new AppError('Invalid email address', 400)
      }

      const { email } = verifiedUser.payload

      const userByEmail = await userGeneralService.findUserByEmail(email)

      if (userByEmail) {
        try {
          const token = await jwtService.executeSign({
            id: userByEmail.id,
            username: userByEmail.username,
            email: userByEmail.email
          })

          req.session = { jwt: token };

          return res.status(200).json(classToClass(userByEmail));
        } catch (err) {
          throw new AppError("Failed to get token", 400);
        }
      }

      if (!userByEmail) {
        const username = await usernameService.generateUniqueUsername()

        const formattedEmail = email as string

        const user = await createUser.createUserThroughSocialLogin({
          username,
          email: formattedEmail
        });

        const token = await jwtService.executeSign({
          id: user.id,
          username: user.username,
          email: user.email
        })

        req.session = { jwt: token };

        return res.status(200).json(classToClass(user));
      }

      res.status(200).send({ user_needs_to_register: true })

    } catch (err) {
      throw new AppError("Invalid google token, try again later", 400);
    }

  }


  public async facebookLogin(req: Request, res: Response) {
    const facebookService = container.resolve(FacebookService);

    const { facebookToken, userId } = req.body;

    try {
      const verifiedUser = await facebookService.executeVerifyToken(facebookToken, userId)

      return res.status(200).json({ userVerified: verifiedUser })
    } catch (err) {
      throw new AppError("Invalid facebook token, try again later", 400);
    }
  }


  public async LinkedInLogin(req: Request, res: Response) {
    const linkedInService = container.resolve(LinkedInService);
    const jwtService = container.resolve(JwtService);
    const usernameService = container.resolve(UsernameService);
    const createUser = container.resolve(CreateUserService);
    const userGeneralService = container.resolve(UserGeneralService)

    const { code } = req.body;

    if (!code) {
      throw new AppError("Code not provided", 400);
    }

    const getUserToken = await linkedInService.executeGetAccessToken(code)

    const accessToken = getUserToken["access_token"]

    const getUserEmailAddress = await linkedInService.executeGetUserEmailAddress(accessToken)

    if (!getUserEmailAddress) {
      throw new Error("Error getting user email address")
    }

    const userByEmail = await userGeneralService.findUserByEmail(getUserEmailAddress)

    if (userByEmail) {
      try {
        const token = await jwtService.executeSign({
          id: userByEmail.id,
          username: userByEmail.username,
          email: userByEmail.email
        })

        req.session = { jwt: token };

        return res.status(200).json(classToClass(userByEmail));
      } catch (err) {
        throw new AppError("Failed to get token", 400);
      }
    }


    if (!userByEmail) {
      const username = await usernameService.generateUniqueUsername()

      const formattedEmail = getUserEmailAddress as string

      const user = await createUser.createUserThroughSocialLogin({
        username,
        email: formattedEmail
      });

      const token = await jwtService.executeSign({
        id: user.id,
        username: user.username,
        email: user.email
      })

      req.session = { jwt: token };

      return res.status(200).json(classToClass(user));
    }

    return res.status(200).json({ userToken: true })

  }

  public async verifyLinkedInToken(req: Request, res: Response) {
    const linkedInService = container.resolve(LinkedInService);

    const { token } = req.body;

    if (!token) {
      throw new AppError("Token not provided", 400);
    }

    const getUserEmailAddress = await linkedInService.executeGetUserEmailAddress(token)

    return res.status(200).json({ userEmailAddress: getUserEmailAddress })
  }

}