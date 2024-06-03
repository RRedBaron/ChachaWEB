export type Review = {
  id: number;
  dish_id: number;
  user_id: number;
  username: string;
  rating: number;
  comment: string | null;
  createdAt?: Date;
  updatedAt?: Date;
};
