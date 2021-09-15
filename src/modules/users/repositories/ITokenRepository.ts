import Token from "../infra/database/entities/Token";


export default interface ITokenRepository {
    findByUserId(id: string): Promise<Token | undefined>;
    createToken(tokenData: any): Promise<Token>;
    findByUserIdAndToken({ userId, token }: { userId: string, token: string }): Promise<Token | undefined>;
    deleteToken(token: string): Promise<any>;
}