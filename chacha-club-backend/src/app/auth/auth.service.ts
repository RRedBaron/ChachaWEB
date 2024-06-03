import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/typedefs';
import { SecurityService } from '../security/security.service';
import { RegisterParams } from './schemes';
import { InputError } from '../shared/errors/input-error';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private readonly securityService: SecurityService,
        private readonly mailService: MailService
    ) {}

    async validateUser(username: string, pass: string): Promise<User | null> {
        const user = await this.userService.getByUsernameWithPassword(username);

        if (user && (await this.securityService.comparePasswords(pass, user.password))) {
            const { password, ...result } = user;
            return result;
        }

        return null;
    }

    async login(user: any) {
        const payload = {
            id: user.id,
            username: user.username,
            role: user.role,
            isVerified: user.isVerified
        };

        return {
            access_token: this.jwtService.sign(payload)
        };
    }

    async register(params: RegisterParams) {
        const users = await this.userService.getManyOr({
            username: params.username,
            email: params.email
        });
        if (users.length > 0) {
            throw new InputError('User already exists', null, 409);
        } else {
            const newUser = await this.userService.create({
                username: params.username,
                email: params.email,
                password: params.password,
                role: 'USER',
                isVerified: false
            });

            const token: string = await this.securityService.generateEmailValidationToken(newUser.id);

            await this.mailService.sendVerificationEmail(newUser.email, token);
            return this.login(newUser);
        }
    }

    async verify(token: string) {
        const activeToken = await this.securityService.findToken(token); //find token in db
        const expirationTime = 1000 * 60 * 60; // 1 hour
        if (!activeToken) {
            //if token not found
            throw new InputError('Invalid token', null, 400);
        }
        if (!activeToken.isActive) {
            //if token is not active
            throw new InputError('Token is not active', null, 400);
        }
        if (activeToken.createdAt.getTime() + expirationTime < new Date().getTime()) {
            //if token is expired
            await this.securityService.disableToken(activeToken.id);
            throw new InputError('Token expired', null, 400);
        }

        await this.userService.verifyEmail(activeToken.userId); //verify user email (drops error if user not found)
        await this.securityService.disableToken(activeToken.id); //disable token after verification

        return { message: 'Email verified' };
    }

    async resendVerification(id: number) {
        const user = await this.userService.getById(id);
        if (!user) {
            throw new InputError('User not found', null, 404);
        }

        if (user.isVerified) {
            throw new InputError('User already verified', null, 409);
        }

        const token: string = await this.securityService.generateEmailValidationToken(id);

        await this.mailService.sendVerificationEmail(user.email, token);

        return { message: 'Verification email was resent' };
    }
}
