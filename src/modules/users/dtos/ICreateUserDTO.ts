export default interface ICreateUserDTO {
  username: string;
  email: string;
  password: string;
}

export interface ICreateUserThroughOauthDTO {
  username: string;
  email: string;
}
