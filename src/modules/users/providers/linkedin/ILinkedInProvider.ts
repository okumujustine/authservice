export default interface ILinkedInProvider {
    getAccessToken(code: string): Promise<any>;
    getUserEmailAddress(token: string): Promise<any>;
}
