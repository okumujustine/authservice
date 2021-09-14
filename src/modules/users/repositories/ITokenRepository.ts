import Token from "../infra/database/entities/Token";


export default interface ITokenRepository {
    findByUserId(id: string): Promise<Token | undefined>;
    createToken(tokenData: any): Promise<Token>;
}