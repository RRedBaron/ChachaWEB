export type Dish = {
  id: number;
  name: string;
  price: number;
  description: string | null;
  image: string;
  weight: number;
  time_to_cook: number;
  category_id: number;
};
