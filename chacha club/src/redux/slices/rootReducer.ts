import { combineReducers } from "@reduxjs/toolkit";
import dishesReducer from "./dishesSlice";
import categoriesReducer from "./categoriesSlice";
import userReducer from "./userSlice";

const rootReducer = combineReducers({
  dishes: dishesReducer,
  categories: categoriesReducer,
  user: userReducer,
});

export default rootReducer;
