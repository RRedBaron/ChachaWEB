import { Injectable, Logger } from '@nestjs/common';
import { IngredientRepository } from './ingredient.repository';
import { CreateIngredientParams, Ingredient } from './typedefs';
import { UpdateIngredientParams } from './schemes';
import { InternalError } from '../shared/errors/internal-error';

@Injectable()
export class IngredientService {
    private readonly logger = new Logger(IngredientService.name);
    constructor(private readonly ingredientRepository: IngredientRepository) {}

    async getMany(): Promise<Ingredient[]> {
        return this.ingredientRepository.getMany();
    }

    async create(params: CreateIngredientParams): Promise<Ingredient> {
        try {
            return await this.ingredientRepository.create(params);
        } catch (error) {
            this.logger.error(error);
            throw new InternalError('Error creating ingredient', null, 500);
        }
    }

    async update(id: number, params: UpdateIngredientParams): Promise<Ingredient> {
        try {
            return await this.ingredientRepository.update(id, params);
        } catch (error) {
            this.logger.error(error);
            throw new InternalError('Error updating ingredient', null, 500);
        }
    }

    async remove(id: number): Promise<Ingredient> {
        try {
            return await this.ingredientRepository.remove(id);
        } catch (error) {
            this.logger.error(error);
            throw new InternalError('Error removing ingredient', null, 500);
        }
    }

    async getIngredientsByDishId(id: number): Promise<Ingredient[]> {
        return this.ingredientRepository.getIngredientsByDishId(id);
    }
}
