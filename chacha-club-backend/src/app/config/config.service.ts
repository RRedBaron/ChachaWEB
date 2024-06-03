import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { Config, DatabaseConfig } from './typedefs';

@Injectable()
export class ConfigService extends NestConfigService implements Config {
    constructor() {
        super();
    }

    get db(): DatabaseConfig {
        const url: string = this.getOrThrow('POSTGRES_CHACHA_CLUB_DB_APP_URL');

        return { url };
    }

    get recaptchaSecretKey(): string {
        return this.getOrThrow('CAPTCHA_SECRET_KEY');
    }

    get jwtSecret(): string {
        return this.getOrThrow('JWT_SECRET');
    }

    get emailData() {
        return {
            user: this.getOrThrow('EMAIL_USER'),
            pass: this.getOrThrow('EMAIL_PASS'),
            host: this.getOrThrow('EMAIL_HOST'),
            port: this.getOrThrow('EMAIL_PORT'),
            senderMail: this.getOrThrow('EMAIL_SENDER_MAIL')
        };
    }

    get frontendAddress(): string {
        return this.getOrThrow('FRONTEND_URL');
    }
}
