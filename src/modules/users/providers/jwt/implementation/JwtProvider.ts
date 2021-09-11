import { JwtPayload, sign, verify } from "jsonwebtoken";
import IJwtProvider from "../IJwtProvider";

class JwtProvider implements IJwtProvider {
    public async verify(token: string): Promise<string|JwtPayload> {
        return verify(token, process.env.JWT_SECRET_KEY!)
    }
    public async sign(signatureDetails:any): Promise<string> {
        return sign(signatureDetails, process.env.JWT_SECRET_KEY!);
    }
}

export default JwtProvider;