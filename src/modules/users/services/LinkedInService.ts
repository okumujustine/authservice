import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import IFacebookProvider from "../providers/facebook/IFacebookProvider";
import ILinkedInProvider from "../providers/linkedin/ILinkedInProvider";


@injectable()
class LinkedInService {
    constructor(
        @inject('LinkedInProvider')
        private linkedInProvider: ILinkedInProvider,
    ) { }

    public async executeGetAccessToken(code: string): Promise<any> {

        try {

            const linkedInVerifiedUser = await this.linkedInProvider.getAccessToken(code)

            return linkedInVerifiedUser;

        } catch (err) {
            throw new AppError("failed to get LinkedIn access token or expired code, try again later", 400);
        }

    }

    public async executeGetUserEmailAddress(token: string): Promise<any> {

        try {

            const userEmailAddress = await this.linkedInProvider.getUserEmailAddress(token)

            return userEmailAddress;

        } catch (err) {
            console.log("error", err)
            throw new AppError("failed to get LinkedIn user email address or expired token, try again later", 400);
        }

    }

}

export default LinkedInService