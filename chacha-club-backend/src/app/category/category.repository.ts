import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Category, CreateCategoryParams, UpdateCategoryParams } from './typedefs';
import { toBusiness } from './formats';
@Injectable()
export class CategoryRepository {
    constructor(private readonly prismaService: PrismaService) {}
    async findMany(): Promise<Category[]> {
        const categories = await this.prismaService.category.findMany();
        return categories.map(toBusiness);
    }

    async create(params: CreateCategoryParams): Promise<Category> {
        return this.prismaService.category.create({
            data: { ...params }
        });
    }

    async update(id: number, params: UpdateCategoryParams): Promise<Category> {
        return this.prismaService.category.update({
            where: { id },
            data: { ...params }
        });
    }

    async remove(id: number): Promise<Category> {
        return this.prismaService.category.delete({ where: { id } });
    }

    async getCategoriesSize(category_id: number) {
        const count = await this.prismaService.dish.count({
            where: {
                category_id: category_id
            }
        });

        if (count > 0) {
            return { category_id, size: count };
        }

        return { category_id, size: 0 };
    }
}
