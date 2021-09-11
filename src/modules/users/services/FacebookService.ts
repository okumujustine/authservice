import { inject, injectable } from "tsyringe";
import IFacebookProvider from "../providers/facebook/IFacebookProvider";


@injectable()
class FacebookService {
    constructor(
        @inject('FacebookProvider')
        private facebookProvider: IFacebookProvider,
    ){}

    public async executeVerifyToken(accessToken: string, userId:string): Promise<any> {
        const facebookVerifiedUser = await this.facebookProvider.facebookTokenVerify(accessToken, userId)
        return facebookVerifiedUser;
    }

}

export default FacebookService