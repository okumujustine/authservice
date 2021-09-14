export default interface IUsernameGeneratorProvider {
    generateUniqueName(): Promise<string>;
}