import { inject, injectable } from "tsyringe";
import IGoogleProvider from "../providers/google/IGoogleProvider";


@injectable()
class GoogleService {
    constructor(
        @inject('GoogleProvider')
        private googleProvider: IGoogleProvider,
    ){}

    public async executeVerifyToken(token: string): Promise<any> {
        const googleVerifiedUser = await this.googleProvider.googleTokenVerify(token);
        return googleVerifiedUser;
    }

}

export default GoogleService