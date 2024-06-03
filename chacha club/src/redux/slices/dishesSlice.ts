import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Dish } from "../../types/dish";

interface DishesState {
  dishes: Dish[];
  loading: boolean;
  error: string | null;
}

const initialState: DishesState = {
  dishes: [],
  loading: false,
  error: null,
};

export const fetchDishesByCategoryId = createAsyncThunk(
  "dishes/fetchDishesByCategoryId",
  async ({
    categoryId,
    page = 1,
    limit = 6,
  }: {
    categoryId: number;
    page?: number;
    limit?: number;
  }) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/dishes?category_id=${categoryId}&page=${page}&limit=${limit}`
      );

      if (!response.ok) {
        throw new Error("Error fetching dishes");
      }
      const data = await response.json();

      return data;
    } catch (error) {
      throw new Error("Error fetching dishes");
    }
  }
);

const dishesSlice = createSlice({
  name: "dishes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDishesByCategoryId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDishesByCategoryId.fulfilled, (state, action) => {
        state.loading = false;
        state.dishes = action.payload;
      })
      .addCase(fetchDishesByCategoryId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching dishes";
      });
  },
});

export default dishesSlice.reducer;
