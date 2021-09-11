export default interface IGoogleProvider {
    googleTokenVerify(token: string): Promise<any>;
  }
  