import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateDishParams, Dish, GetDishParams, UpdateDishParams } from './typedefs';
import { toBusiness } from './formats';

@Injectable()
export class DishRepository {
    constructor(private readonly prismaService: PrismaService) {}
    async findMany(params: GetDishParams): Promise<Dish[]> {
        const { limit, page, ...whereParams } = params;
        let offset = 0;
        if (page && limit) {
            offset = (page - 1) * limit;
        }

        const dishes = await this.prismaService.dish.findMany({
            where: whereParams,
            take: limit,
            skip: offset,
            include: { category: true }
        });
        return dishes.map(toBusiness);
    }

    async create(params: CreateDishParams): Promise<Dish> {
        const { ingredient_ids, ...dishData } = params;

        const dish = await this.prismaService.$transaction(async (prisma) => {
            const createdDish = await prisma.dish.create({
                data: { ...dishData }
            });

            if (ingredient_ids && ingredient_ids.length > 0) {
                await Promise.all(
                    ingredient_ids.map((ingredientId) =>
                        prisma.ingredient_Dish.create({
                            data: {
                                dish_id: createdDish.id,
                                ingredient_id: ingredientId
                            }
                        })
                    )
                );
            }

            return createdDish;
        });

        return dish;
    }

    async update(id: number, params: UpdateDishParams): Promise<Dish> {
        const { ingredient_ids, ...dishData } = params;

        return this.prismaService.$transaction(async (prisma) => {
            const updatedDish = await prisma.dish.update({
                where: { id },
                data: { ...dishData }
            });

            await prisma.ingredient_Dish.deleteMany({
                where: { dish_id: id }
            });

            if (ingredient_ids && ingredient_ids.length > 0) {
                await Promise.all(
                    ingredient_ids.map((ingredientId) =>
                        prisma.ingredient_Dish.create({
                            data: {
                                dish_id: id,
                                ingredient_id: ingredientId
                            }
                        })
                    )
                );
            }

            return updatedDish;
        });
    }

    async remove(id: number): Promise<Dish> {
        return this.prismaService.$transaction(async (prisma) => {
            await prisma.ingredient_Dish.deleteMany({
                where: {
                    dish_id: id
                }
            });

            const deletedDish = await prisma.dish.delete({
                where: { id }
            });

            return deletedDish;
        });
    }
}
