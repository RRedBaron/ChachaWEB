import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class CaptchaService {
    constructor(private readonly configService: ConfigService) {}

    private readonly secretKey = this.configService.recaptchaSecretKey;

    async verifyCaptcha(token: string): Promise<boolean> {
        const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
        const response = await axios.post(url, {
            secret: this.secretKey,
            response: token
        });
        return response.data.success;
    }
}
