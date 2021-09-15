import 'reflect-metadata';
require('dotenv').config()
import express, { Request, Response, NextFunction } from 'express';
import cookieSession from "cookie-session"
import 'express-async-errors';
import cors from 'cors';
import '@shared/infra/database';
import '@shared/container';
import routes from './routes';
import AppError from '@shared/errors/AppError';


const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))


app.use(express.json());
app.use(cookieSession({
  name: "todoList2021xStyling",
  signed: false
}))

app.use("/just-list", routes)

app.use((err: Error, req: Request, res: Response, next_: NextFunction) => {

  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }

  return res
    .status(500)
    .json({ status: 'error', message: 'Internal server error' });
});

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Server is listening to ${PORT}`);
});
