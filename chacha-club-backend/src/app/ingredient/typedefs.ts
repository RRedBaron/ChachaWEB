export {CreateIngredientParams} from './schemes';

export type Ingredient = {
    id: number;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
};
