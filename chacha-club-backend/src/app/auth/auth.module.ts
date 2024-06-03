import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../shared/constants';
import { JwtStrategy } from './jwt.strategy';
import { SecurityModule } from '../security/security.module';
import { MailModule } from '../mail/mail.module';
@Module({
    imports: [
        UserModule,
        PassportModule,
        SecurityModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '30d' }
        }),
        MailModule
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
