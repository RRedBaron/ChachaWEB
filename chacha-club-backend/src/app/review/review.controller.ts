import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
    Req,
    UseGuards
} from '@nestjs/common';
import { ReviewService } from './review.service';
import {
    CreateReviewParams,
    createReviewParamsSchema,
    GetReviewParams,
    getReviewParamsSchema,
    UpdateReviewParams,
    updateReviewParamsSchema
} from './schemes';
import { ZodValidationPipe } from '../shared/pipes/zod-validation.pipe';
import { JwtAuth } from '../shared/decorators/auth.decorator';
import { RoleEnum } from '../shared/enums';
import { User } from '../shared/typedefs';
import { VerifiedGuard } from '../shared/guards/verified.guard';
import { CaptchaService } from '../security/util-services/captcha.service';
import { InputError } from '../shared/errors/input-error';

@Controller('reviews')
export class ReviewController {
    private readonly logger = new Logger(ReviewController.name);

    constructor(
        private readonly reviewService: ReviewService,
        private readonly captchaService: CaptchaService
    ) {}

    @Get()
    getReviewsForDishes(@Query(new ZodValidationPipe(getReviewParamsSchema)) params: GetReviewParams) {
        return this.reviewService.getByDishId(params);
    }

    @UseGuards(VerifiedGuard)
    @JwtAuth(RoleEnum.USER, RoleEnum.ADMIN)
    @Post()
    create(
        @Body(new ZodValidationPipe(createReviewParamsSchema)) params: CreateReviewParams,
        @Req() req: any
    ) {
        const user: User = req.user;
        const isCaptchaValid = this.captchaService.verifyCaptcha(params.captchaToken);
        if (!isCaptchaValid) {
            throw new InputError('Captcha validation failed.', null, 400);
        }
        return this.reviewService.create(user.id, params);
    }
    @UseGuards(VerifiedGuard)
    @JwtAuth(RoleEnum.USER, RoleEnum.ADMIN)
    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ZodValidationPipe(updateReviewParamsSchema)) params: UpdateReviewParams,
        @Req() req: any
    ) {
        const user: User = req.user;
        return this.reviewService.update(id, user.id, params);
    }

    @UseGuards(VerifiedGuard)
    @JwtAuth(RoleEnum.USER, RoleEnum.ADMIN)
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
        const user: User = req.user;
        return this.reviewService.remove(id, user.id);
    }
}
