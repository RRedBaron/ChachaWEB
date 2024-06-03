import { Ingredient } from './typedefs';

export const toBusiness = (db: Ingredient) => ({
    id: db.id,
    name: db.name
});

export const toBusinessIngredientsDishes = (db) => ({
    id: db.ingredient_id,
    name: db.ingredient.name
});
