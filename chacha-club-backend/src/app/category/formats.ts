import { Category } from './typedefs';

export const toBusiness = (db: Category) => ({
    id: db.id,
    name: db.name
});
