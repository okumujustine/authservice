import JwtService from "@modules/users/services/JwtService";
import {Request, Response, NextFunction} from "express"
import { container } from "tsyringe";


interface IUserPayload{
  id: string;
  username: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: IUserPayload;
    }
  }
}

class IsAuthenticated{
  
  public async currentUser(
      req: Request,
      res: Response,
      next: NextFunction,
    ) {
      const jwtService = container.resolve(JwtService);
      const token = req.session?.jwt

      if(!token) {
          next()
      }

      try{
        const payload = await jwtService.executeVerify(token) as IUserPayload
        req.currentUser = payload
      }catch(err){}
      next()

    }
}

export default IsAuthenticated