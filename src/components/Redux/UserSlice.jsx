import { createSlice } from "@reduxjs/toolkit";

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
    // ADD operations
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
    updateSuadaStatus: (state, action) => {
      const { id, status } = action.payload;
      const suadaIndex = state.suadas.findIndex((s) => s.id === id);
      if (suadaIndex !== -1) {
        state.suadas[suadaIndex].status = status;
      }
    },

    // CREATE operations
    updateMember(state, action) {
      const index = state.members.findIndex(
        (member) => member.id === action.payload.id
      );
      if (index !== -1) {
        state.members[index] = action.payload;
      }
    },
    updateBrand(state, action) {
      const index = state.brands.findIndex(
        (brand) => brand.id === action.payload.id
      );
      if (index !== -1) {
        state.brands[index] = action.payload;
      }
    },
    updateVendor(state, action) {
      const index = state.vendors.findIndex(
        (vendor) => vendor.id === action.payload.id
      );
      if (index !== -1) {
        state.vendors[index] = action.payload;
      }
    },
    updateSeller(state, action) {
      const index = state.sellers.findIndex(
        (seller) => seller.id === action.payload.id
      );
      if (index !== -1) {
        state.sellers[index] = action.payload;
      }
    },
    updateSuada: (state, action) => {
      const index = state.suadas.findIndex(
        (suada) => suada.id === action.payload.id
      );

      if (index !== -1) {
        state.suadas[index] = action.payload;
      }
    },

    // DELETE operations
    deleteMember(state, action) {
      state.members = state.members.filter(
        (member) => member.id !== action.payload
      );
    },
    deleteBrand(state, action) {
      state.brands = state.brands.filter(
        (brand) => brand.id !== action.payload
      );
    },
    deleteVendor(state, action) {
      state.vendors = state.vendors.filter(
        (vendor) => vendor.id !== action.payload
      );
    },
    deleteSeller(state, action) {
      state.sellers = state.sellers.filter(
        (seller) => seller.id !== action.payload
      );
    },
  },
});

export const {
  addMembers,
  addBrands,
  addVendors,
  addSellers,
  addSuadas,
  updateMember,
  updateBrand,
  updateVendor,
  updateSeller,
  updateSuada,
  updateSuadaStatus,
  deleteMember,
  deleteBrand,
  deleteVendor,
  deleteSeller,
} = userSlice.actions;
export default userSlice.reducer;
