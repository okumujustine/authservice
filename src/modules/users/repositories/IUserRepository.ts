import ICreateUserDTO, { ICreateUserThroughOauthDTO } from "../dtos/ICreateUserDTO";
import User from "../infra/database/entities/User";

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByUsername(email: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findByUsernameOrEmail(username_email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
  createUserThroughOauth(data: ICreateUserThroughOauthDTO): Promise<User>;
}
