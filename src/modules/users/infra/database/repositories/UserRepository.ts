import { getRepository, Repository } from 'typeorm';

import IUserRepository from "@modules/users/repositories/IUserRepository";
import User from '../entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';


class UserRepository implements IUserRepository {
    private ormRepository: Repository<User>;

    constructor() {
      this.ormRepository = getRepository(User);
    }

    public findById(id: string): Promise<User | undefined> {
      return this.ormRepository.findOne(id);
    }

    public findByUsername(username: string): Promise<User | undefined> {
        return this.ormRepository.findOne({where: {username}});
    }

    public findByEmail(email: string): Promise<User | undefined> {
        return this.ormRepository.findOne({where: {email}});
    }

    public findByUsernameOrEmail(username_email: string): Promise<User | undefined> {
      return this.ormRepository.findOne({where: [
        {username:username_email}, {email:username_email}
      ]});
  }

    public async create(userData: ICreateUserDTO): Promise<User> {
        const user = this.ormRepository.create(userData);
        this.save(user);
    
        return user;
      }

      public async save(user: User): Promise<User> {
        return this.ormRepository.save(user);
      }
  
}

export default UserRepository