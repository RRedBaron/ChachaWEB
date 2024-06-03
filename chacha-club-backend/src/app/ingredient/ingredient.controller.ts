import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { ZodValidationPipe } from '../shared/pipes/zod-validation.pipe';
import {
    CreateIngredientParams,
    createIngredientParamsSchema,
    UpdateIngredientParams,
    updateIngredientParamsSchema
} from './schemes';
import { JwtAuth } from '../shared/decorators/auth.decorator';
import { RoleEnum } from '../shared/enums';

@Controller('ingredients')
export class IngredientController {
    private readonly logger = new Logger(IngredientController.name);
    constructor(private readonly ingredientService: IngredientService) {}

    @Get()
    get() {
        return this.ingredientService.getMany();
    }

    @JwtAuth(RoleEnum.ADMIN)
    @Post()
    create(@Body(new ZodValidationPipe(createIngredientParamsSchema)) params: CreateIngredientParams) {
        return this.ingredientService.create(params);
    }

    @JwtAuth(RoleEnum.ADMIN)
    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ZodValidationPipe(updateIngredientParamsSchema)) params: UpdateIngredientParams
    ) {
        return this.ingredientService.update(id, params);
    }

    @JwtAuth(RoleEnum.ADMIN)
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.ingredientService.remove(id);
    }
}
