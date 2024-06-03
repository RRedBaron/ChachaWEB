import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { InternalError } from '../shared/errors/internal-error';
import { ConfigService } from '../config/config.service';

import { compile } from 'handlebars';

@Injectable()
export class MailService {
    private transporter;

    constructor(private readonly configService: ConfigService) {
        this.transporter = nodemailer.createTransport({
            host: configService.emailData.host,
            port: configService.emailData.port,
            secure: false,
            auth: {
                user: configService.emailData.user,
                pass: configService.emailData.pass
            }
        });
    }

    private compileTemplate(data: { frontendAddress: string; token: string }): string {
        const source = `<h2>Welcome to ChaCha-Club Community.</h2>
                    <p>To Complete your registration, please, follow the link:
                    <a href="{{frontendAddress}}/verify/{{token}}">Complete Registration</a></p>`;
        const template = compile(source);
        return template(data);
    }

    async sendVerificationEmail(email: string, token: string) {
        const htmlContent = this.compileTemplate({
            token,
            frontendAddress: this.configService.frontendAddress
        });
        const mailOptions = {
            from: this.configService.emailData.senderMail, // sender address
            to: `${email}`, // list of receivers
            subject: 'Complete Registration ', // Subject line
            html: htmlContent
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log('Message sent: %s', info.messageId);
            return info;
        } catch (error) {
            throw new InternalError('Error sending email', null, 500);
        }
    }
}
