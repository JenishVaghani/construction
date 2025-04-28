import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAdmin: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // ADD operations
    addIsAdmin(state, action) {
      state.isAdmin.push(action.payload);
    },
  },
});

export const { addIsAdmin } = userSlice.actions;
export default userSlice.reducer;
