export interface MailOptions {
    from: string;
    to: string;
    subject: string;
    html: string
}

export interface IEmailProvider {
    sendEmail(mailOptions: MailOptions): Promise<any>;
}