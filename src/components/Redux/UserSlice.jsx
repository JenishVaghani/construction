import { createSlice } from "@reduxjs/toolkit";
import AddSuada from "../Dashboard/AddSuada";

const initialState = {
  members: [],
  brands: [],
  vendors: [],
  sellers: [],
  suadas: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addMembers(state, action) {
      state.members.push(action.payload);
    },
    addBrands(state, action) {
      state.brands.push(action.payload);
    },
    addVendors(state, action) {
      state.vendors.push(action.payload);
    },
    addSellers(state, action) {
      state.sellers.push(action.payload);
    },
    addSuadas(state, action) {
      state.suadas.push(action.payload);
    },
  },
});

export const { addMembers, addBrands, addVendors, addSellers, addSuadas } =
  userSlice.actions;
export default userSlice.reducer;
