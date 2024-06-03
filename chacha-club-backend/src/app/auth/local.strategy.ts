import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/typedefs';
import { CaptchaService } from '../security/util-services/captcha.service';
import { InputError } from '../shared/errors/input-error';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private authService: AuthService,
        private readonly captchaService: CaptchaService
    ) {
        super({ passReqToCallback: true });
    }

    async validate(req: any, username: string, password: string): Promise<User> {
        const captchaToken = req.body.captchaToken;
        const isCaptchaValid = await this.captchaService.verifyCaptcha(captchaToken);
        if (!isCaptchaValid) {
            throw new InputError('Captcha validation failed.', null, 400);
        }
        const user = await this.authService.validateUser(username, password);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
