import { Injectable, Logger } from '@nestjs/common';
import { DishRepository } from './dish.repository';
import { CreateDishParams, Dish, GetDishParams, UpdateDishParams } from './typedefs';
import { SecurityService } from '../security/security.service';
import { InternalError } from '../shared/errors/internal-error';

@Injectable()
export class DishService {
    private readonly logger = new Logger(DishService.name);

    constructor(
        private readonly dishRepository: DishRepository,
        private readonly securityService: SecurityService
    ) {}
    async getMany(params: GetDishParams): Promise<Dish | Dish[]> {
        try {
            return this.dishRepository.findMany(params);
        } catch (error) {
            this.logger.error('Error getting dishes', error);
            throw new InternalError('Error getting dishes', null, 500);
        }
    }

    async create(params: CreateDishParams): Promise<Dish> {
        try {
            return await this.dishRepository.create(params);
        } catch (error) {
            this.logger.error('Error creating dish', error);
            throw new InternalError('Error creating dish', null, 500);
        }
    }

    async update(id: number, params: UpdateDishParams) {
        try {
            return await this.dishRepository.update(id, params);
        } catch (error) {
            this.logger.error('Error updating dish', error);
            throw new InternalError('Error updating dish', null, 500);
        }
    }

    async remove(id: number) {
        try {
            return await this.dishRepository.remove(id);
        } catch (error) {
            this.logger.error('Error removing dish', error);
            throw new InternalError('Error removing dish', null, 500);
        }
    }

    async getDailyDish() {
        const dishes = await this.dishRepository.findMany({});
        const today = new Date().toDateString();

        const hash = this.securityService.hashCodeForDailyDish(today);

        const dishIndex = Math.abs(hash) % dishes.length;

        return dishes[dishIndex];
    }
}
