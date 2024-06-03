import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateIngredientParams, Ingredient } from './typedefs';
import { UpdateIngredientParams } from './schemes';
import { toBusiness, toBusinessIngredientsDishes } from './formats';
@Injectable()
export class IngredientRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async getMany(): Promise<Ingredient[]> {
        const ingredients = await this.prismaService.ingredient.findMany();
        return ingredients.map(toBusiness);
    }
    async create(params: CreateIngredientParams): Promise<Ingredient> {
        return this.prismaService.ingredient.create({ data: params });
    }
    async update(id: number, params: UpdateIngredientParams): Promise<Ingredient> {
        return this.prismaService.ingredient.update({ where: { id }, data: params });
    }
    async remove(id: number): Promise<Ingredient> {
        return this.prismaService.ingredient.delete({ where: { id } });
    }

    async getIngredientsByDishId(dish_id: number): Promise<Ingredient[]> {
        const ingredients = await this.prismaService.ingredient_Dish.findMany({
            where: { dish_id: dish_id },
            include: { ingredient: true }
        });
        return ingredients.map(toBusinessIngredientsDishes);
    }
}
