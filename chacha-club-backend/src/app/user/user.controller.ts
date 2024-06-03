import { Controller, Post, Get, Logger, Body, Query, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { RoleEnum } from '../shared/enums';
import { createUserParamsSchema, CreateUserParams, getUserParamsSchema, GetUserParams } from './schemes';
import { JwtAuth } from '../shared/decorators/auth.decorator';
import { ZodValidationPipe } from '../shared/pipes/zod-validation.pipe';
@Controller('users')
export class UserController {
    private readonly logger = new Logger(UserController.name);
    constructor(private readonly userService: UserService) {}

    @JwtAuth(RoleEnum.ADMIN)
    @Post()
    create(
        @Body(new ZodValidationPipe(createUserParamsSchema))
        params: CreateUserParams
    ) {
        return this.userService.create(params);
    }

    @JwtAuth(RoleEnum.ADMIN)
    @Get()
    get(@Query(new ZodValidationPipe(getUserParamsSchema)) params: GetUserParams) {
        return this.userService.getMany(params);
    }

    @JwtAuth(RoleEnum.ADMIN, RoleEnum.USER)
    @Get('/profile')
    getProfile(@Req() req: any) {
        const userId = req.user.id;
        return this.userService.getById(userId);
    }
}
