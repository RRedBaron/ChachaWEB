export { CreateReviewParams, UpdateReviewParams, GetReviewParams } from './schemes';

export type Review = {
    id: number;
    dish_id: number;
    user_id: number;
    rating: number;
    comment: string | null;
    createdAt?: Date;
    updatedAt?: Date;
};

export type ReviewBusiness = Review & {username: string;};

