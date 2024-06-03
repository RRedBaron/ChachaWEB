import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { hashingSaltRounds } from '../shared/constants';
import { SecurityRepository } from './securuty.repository';
import { randomBytes } from 'crypto';
import { InternalError } from '../shared/errors/internal-error';

@Injectable()
export class SecurityService {
    private readonly logger = new Logger(SecurityService.name);

    constructor(private readonly securityRepository: SecurityRepository) {}
    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, hashingSaltRounds);
    }

    async comparePasswords(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(plainTextPassword, hashedPassword);
    }

    hashCodeForDailyDish(str: string): number {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash |= 0;
        }
        return hash;
    }

    async generateEmailValidationToken(userId: number) {
        /* Creates Token in DB for selected user and disable all other tokens of this user */
        let unique = false;
        let token;

        while (!unique) {
            token = randomBytes(32).toString('hex');
            const existingToken = await this.securityRepository.findToken(token);
            if (!existingToken) {
                unique = true;
            }
        }

        try {
            await this.securityRepository.createToken(token, userId);
        } catch (error) {
            this.logger.error('Error while creating token: ' + error);
            throw new InternalError('Error while creating token', null, 500);
        }

        return token;
    }

    async findToken(token: string) {
        return this.securityRepository.findToken(token);
    }

    async disableToken(tokenId: number) {
        try {
            return await this.securityRepository.disableToken(tokenId);
        } catch (error) {
            this.logger.error('Error while disabling token: ' + error);
            throw new InternalError('Error while disabling token', null, 500);
        }
    }
}
