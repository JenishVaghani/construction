import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // isAdmin: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // ADD operations
    // addIsAdmin(state, action) {
    //   state.isAdmin = action.payload;
    // },
  },
});

// export const { addIsAdmin } = userSlice.actions;
export default userSlice.reducer;
