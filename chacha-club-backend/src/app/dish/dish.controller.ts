import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { DishService } from './dish.service';
import { JwtAuth } from '../shared/decorators/auth.decorator';
import { RoleEnum } from '../shared/enums';
import { ZodValidationPipe } from '../shared/pipes/zod-validation.pipe';
import {
    CreateDishParams,
    createDishParamsSchema,
    GetDishParams,
    getDishParamsSchema,
    UpdateDishParams,
    updateDishParamsSchema
} from './schemes';
import { IngredientService } from '../ingredient/ingredient.service';
import { ReviewService } from '../review/review.service';

@Controller('dishes')
export class DishController {
    private readonly logger = new Logger(DishController.name);
    constructor(
        private readonly dishService: DishService,
        private readonly ingredientService: IngredientService,
        private readonly reviewService: ReviewService
    ) {}

    @Get()
    get(@Query(new ZodValidationPipe(getDishParamsSchema)) params: GetDishParams) {
        return this.dishService.getMany(params);
    }

    @Get(':id/ingredients')
    getIngredients(@Param('id', ParseIntPipe) id: number) {
        return this.ingredientService.getIngredientsByDishId(id);
    }

    @Get('/daily-dish')
    getDailyDish() {
        return this.dishService.getDailyDish();
    }
    @JwtAuth(RoleEnum.ADMIN)
    @Post()
    create(@Body(new ZodValidationPipe(createDishParamsSchema)) params: CreateDishParams) {
        return this.dishService.create(params);
    }
    @JwtAuth(RoleEnum.ADMIN)
    @Put(':id')
    update(
        @Body(new ZodValidationPipe(updateDishParamsSchema)) params: UpdateDishParams,
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.dishService.update(id, params);
    }

    @JwtAuth(RoleEnum.ADMIN)
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.dishService.remove(id);
    }
}
