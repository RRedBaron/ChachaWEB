import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Category } from "../../types/category";

interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/categories`
      );
      if (!response.ok) {
        throw new Error("Error fetching categories");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Error fetching categories");
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching categories";
      });
  },
});

export default categoriesSlice.reducer;
