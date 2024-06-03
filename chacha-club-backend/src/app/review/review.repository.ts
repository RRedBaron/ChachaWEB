import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { GetReviewParams, Review, ReviewBusiness, UpdateReviewParams } from './typedefs';
import { toBuisinessMany, toBusiness } from './formats';
@Injectable()
export class ReviewRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async getManyByDishId(params: GetReviewParams): Promise<ReviewBusiness[]> {
        let offset = 0;
        if (params.page && params.limit) {
            offset = (params.page - 1) * params.limit;
        }

        const reviews = await this.prismaService.review.findMany({
            where: {
                dish_id: params.dish_id
            },
            take: params.limit,
            skip: offset,
            include: {
                user: {
                    select: {
                        username: true
                    }
                }
            }
        });

        return reviews.map(toBuisinessMany);
    }

    async create(userId: number, params): Promise<Review> {
        const review = await this.prismaService.review.create({
            data: {
                user_id: userId,
                ...params
            }
        });

        return toBusiness(review);
    }

    async update(id: number, userId: number, params: UpdateReviewParams): Promise<Review> {
        const review = await this.prismaService.review.update({
            where: {
                id: id,
                user_id: userId
            },
            data: {
                ...params
            }
        });

        return toBusiness(review);
    }

    async remove(id: number, userId: number): Promise<Review> {
        const review = await this.prismaService.review.delete({
            where: {
                id: id,
                user_id: userId
            }
        });
        return toBusiness(review);
    }
}
