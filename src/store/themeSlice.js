import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  themeMode: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    darkMode: (state) => {
      state.themeMode = "dark";
    },
    lightMode: (state) => {
      state.themeMode = "light";
    },
  },
});

export const { darkMode, lightMode } = themeSlice.actions;

export default themeSlice.reducer;
