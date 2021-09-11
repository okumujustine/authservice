export default interface IFacebookProvider {
    facebookTokenVerify(accessToken: string, userId: string): Promise<any>;
  }
  