import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';

import { SecurityModule } from '../security/security.module';

@Module({
    imports: [SecurityModule],
    providers: [UserService, UserRepository],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule {}
