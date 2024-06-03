import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import {
    CreateCategoryParams,
    createCategoryParamsSchema,
    UpdateCategoryParams,
    updateCategoryParamsSchema
} from './schemes';
import { ZodValidationPipe } from '../shared/pipes/zod-validation.pipe';
import { JwtAuth } from '../shared/decorators/auth.decorator';
import { RoleEnum } from '../shared/enums';

@Controller('categories')
export class CategoryController {
    private readonly logger = new Logger(CategoryController.name);
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    get() {
        return this.categoryService.getMany();
    }

    @Get('/size/:id')
    getCategoriesSize(@Param('id', ParseIntPipe) category_id: number) {
        return this.categoryService.getCategoriesSize(category_id);
    }

    @JwtAuth(RoleEnum.ADMIN)
    @Post()
    create(@Body(new ZodValidationPipe(createCategoryParamsSchema)) params: CreateCategoryParams) {
        return this.categoryService.create(params);
    }
    @JwtAuth(RoleEnum.ADMIN)
    @Put(':id')
    update(
        @Body(new ZodValidationPipe(updateCategoryParamsSchema)) params: UpdateCategoryParams,
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.categoryService.update(id, params);
    }

    @JwtAuth(RoleEnum.ADMIN)
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.categoryService.remove(id);
    }
}
