import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postData: {},
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    openPost: (state, action) => {
      state.postData = action.payload;
    },
  },
});

export const { openPost } = postSlice.actions;

export default postSlice.reducer;
