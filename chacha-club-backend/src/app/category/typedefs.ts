export { CreateCategoryParams, UpdateCategoryParams } from "./schemes";

export type Category = {
    id: number;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
};
