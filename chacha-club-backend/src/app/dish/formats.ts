export const toBusiness = (dbDish) => ({
    id: dbDish.id,
    name: dbDish.name,
    price: dbDish.price,
    description: dbDish.description,
    weight: dbDish.weight,
    time_to_cook: dbDish.time_to_cook,
    image: dbDish.image,
    category_id: dbDish.category_id,
    category_name: dbDish.category.name
});
