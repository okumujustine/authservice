import { customConfig } from "@config/UsernameGeneratorConfig";
import { uniqueNamesGenerator } from "unique-names-generator";
import IUsernameGeneratorProvider from "../IUsernameGeneratorProvider";


class UsernameGeneratorProvider implements IUsernameGeneratorProvider {

    public async generateUniqueName(): Promise<string> {
        const shortName: string = uniqueNamesGenerator(customConfig);
        return shortName
    }
}

export default UsernameGeneratorProvider;