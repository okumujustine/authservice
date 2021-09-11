// AppError
import AppError from "@shared/errors/AppError"
import {Request, Response, NextFunction} from "express"

export const requireAuth = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
      if(!req.currentUser){
        throw new AppError("Unauthorized, method not allowed'", 401)
      }
      
      next()
  }