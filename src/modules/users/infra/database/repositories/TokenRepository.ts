import ITokenRepository from '@modules/users/repositories/ITokenRepository';
import { getRepository, Repository } from 'typeorm';
import Token from '../entities/Token';

class TokenRepository implements ITokenRepository {
    private ormRepository: Repository<Token>;

    constructor() {
        this.ormRepository = getRepository(Token);
    }

    public findByUserId(userId: string): Promise<Token | undefined> {
        return this.ormRepository.findOne({
            where: { user: userId },
            relations: ['user']
        });
    }

    public async createToken(tokenData: Token): Promise<Token> {
        const token = await this.ormRepository.create(tokenData)
        return this.save(token);
    }

    public async save(token: Token): Promise<Token> {
        return this.ormRepository.save(token);
    }
}

export default TokenRepository