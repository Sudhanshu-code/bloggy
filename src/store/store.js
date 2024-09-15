import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./authSlice";
import postReducer from "./postSlice";
import themeReducer from "./themeSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    theme: themeReducer,
  },
});
