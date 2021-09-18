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

    public findByUserIdAndToken({ userId, token }: { userId: string, token: string }): Promise<Token | undefined> {
        return this.ormRepository
            .createQueryBuilder('tokens')
            .where('tokens.user = :userId', { userId })
            .andWhere('tokens.token = :token', { token })
            .getOne();
    }

    public async createToken(tokenData: Token): Promise<Token> {
        const token = await this.ormRepository.create(tokenData)
        return this.save(token);
    }

    public async deleteToken(tokenData: string): Promise<any> {
        await this.ormRepository
            .createQueryBuilder('tokens')
            .delete()
            .from(Token)
            .where("token = :token", { token: tokenData })
            .execute();
    }

    public async save(token: Token): Promise<Token> {
        const tokenCreated = await this.ormRepository.save(token);
        return tokenCreated
    }
}

export default TokenRepository