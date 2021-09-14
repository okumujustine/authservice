import { inject, injectable } from "tsyringe";
import IUsernameGeneratorProvider from "../providers/UsernameGenerator/IUsernameGeneratorProvider";

@injectable()
class UsernameService {
    constructor(
        @inject('UsernameGeneratorProvider')
        private usernameGeneratorProvider: IUsernameGeneratorProvider,

    ) { }

    public async generateUniqueUsername(): Promise<string> {
        const userName = this.usernameGeneratorProvider.generateUniqueName()
        return userName;
    }
}

export default UsernameService