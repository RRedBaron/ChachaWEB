import { Injectable, Logger } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { Category, CreateCategoryParams, UpdateCategoryParams } from './typedefs';
import { InternalError } from '../shared/errors/internal-error';

@Injectable()
export class CategoryService {
    private readonly logger = new Logger(CategoryService.name);

    constructor(private readonly categoryRepository: CategoryRepository) {}
    async getMany(): Promise<Category[]> {
        return this.categoryRepository.findMany();
    }

    async create(params: CreateCategoryParams): Promise<Category> {
        try {
            return await this.categoryRepository.create(params);
        } catch (error) {
            this.logger.error('Error creating category', error);
            throw new InternalError('Error creating category', null, 500);
        }
    }

    async update(id: number, params: UpdateCategoryParams): Promise<Category> {
        try {
            return await this.categoryRepository.update(id, params);
        } catch (error) {
            this.logger.error('Error updating category', error);
            throw new InternalError('Error updating category', null, 500);
        }
    }

    async remove(id: number): Promise<Category> {
        try {
            return await this.categoryRepository.remove(id);
        } catch (error) {
            this.logger.error('Error deleting category', error);
            throw new InternalError('Error deleting category', null, 500);
        }
    }

    async getCategoriesSize(category_id: number) {
        try {
            return await this.categoryRepository.getCategoriesSize(category_id);
        } catch (error) {
            this.logger.error('Error getting categories size', error);
            throw new InternalError('Error getting categories size', null, 500);
        }
    }
}
