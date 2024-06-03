import { Injectable, Logger } from '@nestjs/common';
import { CreateReviewParams, GetReviewParams, Review, ReviewBusiness, UpdateReviewParams } from './typedefs';
import { ReviewRepository } from './review.repository';
import { InternalError } from '../shared/errors/internal-error';

@Injectable()
export class ReviewService {
    private readonly logger = new Logger(ReviewService.name);

    constructor(private readonly reviewRepository: ReviewRepository) {}
    async getByDishId(params: GetReviewParams): Promise<ReviewBusiness[]> {
        return this.reviewRepository.getManyByDishId(params);
    }

    async create(userId: number, params: CreateReviewParams): Promise<Review> {
        const create_params = {
            dish_id: params.dish_id,
            rating: params.rating,
            comment: params.comment
        };

        try {
            return await this.reviewRepository.create(userId, create_params);
        } catch (error) {
            this.logger.error('Error while creating review: ' + error);
            throw new InternalError('Error while creating review', null, 500);
        }
    }

    async update(id: number, userId: number, params: UpdateReviewParams): Promise<Review> {
        try {
            return await this.reviewRepository.update(id, userId, params);
        } catch (error) {
            this.logger.error('Error while updating review: ' + error);
            throw new InternalError('Error while updating review', null, 500);
        }
    }

    async remove(id: number, userId: number): Promise<Review> {
        try {
            return await this.reviewRepository.remove(id, userId);
        } catch (error) {
            this.logger.error('Error while removing review: ' + error);
            throw new InternalError('Error while removing review', null, 500);
        }
    }
}
