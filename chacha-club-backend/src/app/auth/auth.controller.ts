import { Controller, Request, Post, UseGuards, Body, Get, Param, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../shared/guards/local-auth.guard';
import { ZodValidationPipe } from '../shared/pipes/zod-validation.pipe';
import { RegisterParams, registerParamsSchema } from './schemes';
import { JwtAuth } from '../shared/decorators/auth.decorator';
import { RoleEnum } from '../shared/enums';
import { InternalError } from '../shared/errors/internal-error';
import { CaptchaService } from '../security/util-services/captcha.service';
import { InputError } from '../shared/errors/input-error';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly recaptchaService: CaptchaService
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('register')
    async register(@Body(new ZodValidationPipe(registerParamsSchema)) params: RegisterParams) {
        const isCaptchaValid = await this.recaptchaService.verifyCaptcha(params.captchaToken);
        if (!isCaptchaValid) {
            throw new InputError('Captcha validation failed.', null, 400);
        }
        return this.authService.register(params);
    }
    @Get('verify/:token')
    verify(@Param('token') token: string) {
        return this.authService.verify(token);
    }
    @JwtAuth(RoleEnum.USER, RoleEnum.ADMIN)
    @Post('resend-verification')
    resendVerification(@Req() req) {
        const userId = req.user.id;
        if (userId) {
            return this.authService.resendVerification(userId);
        } else {
            throw new InternalError('User not found, something went wrong.', null, 500);
        }
    }
}
