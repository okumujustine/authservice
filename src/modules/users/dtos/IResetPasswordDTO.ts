export interface IResetPasswordDTO {
    password: string;
    password2: string;
    token: string;
    userId: string;
}