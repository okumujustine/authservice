import { inject, injectable } from "tsyringe";
import IJwtProvider from "../providers/jwt/IJwtProvider";


@injectable()
class JwtService{
    constructor(
        @inject('JwtProvider')
        private jwtProvider: IJwtProvider,
    ){}
    public async executeVerify(token:string) {
        return this.jwtProvider.verify(token)
    }

    public async executeSign(signatureDetails:any) {
        return this.jwtProvider.sign(signatureDetails)
    }
}

export default JwtService;