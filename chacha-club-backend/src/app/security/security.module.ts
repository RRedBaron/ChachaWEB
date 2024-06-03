import { Module } from '@nestjs/common';
import { SecurityService } from './security.service';
import { SecurityRepository } from './securuty.repository';
import { CaptchaService } from './util-services/captcha.service';

@Module({
    providers: [SecurityService, SecurityRepository, CaptchaService],
    exports: [SecurityService, CaptchaService]
})
export class SecurityModule {}
