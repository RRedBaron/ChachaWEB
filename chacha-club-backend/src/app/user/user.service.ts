import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserParams, GetUserParams, User, UserWithPassword } from './typedefs';
import { SecurityService } from '../security/security.service';
import { InputError } from '../shared/errors/input-error';
import { InternalError } from '../shared/errors/internal-error';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);

    constructor(
        private readonly userRepository: UserRepository,
        private readonly securityService: SecurityService
    ) {}

    async getManyOr(params: GetUserParams): Promise<User[]> {
        /* Uses the UserRepository to find users by the given parameters with OR method param1 OR param2 etc...*/
        return this.userRepository.findManyOr(params);
    }

    async create(params: CreateUserParams) {
        const hashedPassword = await this.securityService.hashPassword(params.password);
        try {
            return await this.userRepository.create({ ...params, password: hashedPassword });
        } catch (error) {
            this.logger.error(error);
            throw new InternalError('Failed to create user', null, 500);
        }
    }

    async getById(id: number): Promise<User> {
        const user = await this.userRepository.findById(id);

        if (!user) {
            this.logger.warn(`User with id ${id} not found`);
            throw new InputError('User was not found', null, 404);
        }

        return user;
    }

    async verifyEmail(userId: number) {
        const user = await this.getById(userId);
        if (user && user.isVerified) {
            this.logger.log(`User with id ${userId} is already verified`);
            throw new InputError('User is already verified', null, 400);
        }
        try {
            return await this.userRepository.verifyEmail(userId);
        } catch (error) {
            this.logger.error(error);
            throw new InternalError('Failed to verify email', null, 500);
        }
    }

    // use only for auth
    async getByUsernameWithPassword(username: string): Promise<UserWithPassword | null> {
        return this.userRepository.findByUsernameWithPassword(username);
    }

    async getMany(params: GetUserParams) {
        return this.userRepository.findMany(params);
    }
}
