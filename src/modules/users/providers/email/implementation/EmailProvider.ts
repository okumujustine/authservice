import nodemailer from "nodemailer";
import { IEmailProvider, MailOptions } from "../IEmailProvider"


const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_CLIENT,
    auth: {
        user: process.env.EMAIL_CLIENT_EMAIL,
        pass: process.env.EMAIL_CLIENT_PASSWORD
    }
});

class EmailProvider implements IEmailProvider {
    public async sendEmail(mailOptions: MailOptions): Promise<any> {
        const email = await transporter.sendMail(mailOptions);
        return email
    }
}

export default EmailProvider