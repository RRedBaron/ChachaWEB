export const toBusiness = (dbReview) => ({
    id: dbReview.id,
    rating: dbReview.rating,
    comment: dbReview.comment,
    dish_id: dbReview.dish_id,
    user_id: dbReview.user_id,
    createdAt: dbReview.createdAt,
    updatedAt: dbReview.updatedAt
});
export const toBuisinessMany = (businessReview) => ({
    id: businessReview.id,
    rating: businessReview.rating,
    comment: businessReview.comment,
    dish_id: businessReview.dish_id,
    user_id: businessReview.user_id,
    username: businessReview.user.username,
    createdAt: businessReview.createdAt,
    updatedAt: businessReview.updatedAt
});
