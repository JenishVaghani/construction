import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

// Load data from localStorage or use default empty arrays
const loadState = () => {
  try {
    const membersState = localStorage.getItem("members");
    const brandsState = localStorage.getItem("brands");
    const vendorsState = localStorage.getItem("vendors");
    const sellersState = localStorage.getItem("sellers");
    const suadasState = localStorage.getItem("suadas");

    return {
      members: membersState ? JSON.parse(membersState) : [],
      brands: brandsState ? JSON.parse(brandsState) : [],
      vendors: vendorsState ? JSON.parse(vendorsState) : [],
      sellers: sellersState ? JSON.parse(sellersState) : [],
      suadas: suadasState ? JSON.parse(suadasState) : []
    };
  } catch (err) {
    console.error("Error loading state from localStorage:", err);
    return {
      members: [],
      brands: [],
      vendors: [],
      sellers: [],
      suadas: []
    };
  }
};

const initialState = loadState();

// Helper function to save state to localStorage
const saveState = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Error saving ${key} to localStorage:`, err);
  }
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // CREATE operations
    addMembers(state, action) {
      const newMember = { ...action.payload, id: uuidv4() };
      state.members.push(newMember);
      saveState("members", state.members);
    },
    addBrands(state, action) {
      const newBrand = { ...action.payload, id: uuidv4() };
      state.brands.push(newBrand);
      saveState("brands", state.brands);
    },
    addVendors(state, action) {
      const newVendor = { ...action.payload, id: uuidv4() };
      state.vendors.push(newVendor);
      saveState("vendors", state.vendors);
    },
    addSellers(state, action) {
      const newSeller = { ...action.payload, id: uuidv4() };
      state.sellers.push(newSeller);
      saveState("sellers", state.sellers);
    },
    addSuadas(state, action) {
      const newSuada = { ...action.payload, id: uuidv4() };
      state.suadas.push(newSuada);
      saveState("suadas", state.suadas);
    },

    // UPDATE operations
    updateMember(state, action) {
      const { id, updatedData } = action.payload;
      const index = state.members.findIndex((member) => member.id === id);
      if (index !== -1) {
        state.members[index] = { ...state.members[index], ...updatedData };
        saveState("members", state.members);
      }
    },
    updateBrand(state, action) {
      const { id, updatedData } = action.payload;
      const index = state.brands.findIndex((brand) => brand.id === id);
      if (index !== -1) {
        state.brands[index] = { ...state.brands[index], ...updatedData };
        saveState("brands", state.brands);
      }
    },
    updateVendor(state, action) {
      const { id, updatedData } = action.payload;
      const index = state.vendors.findIndex((vendor) => vendor.id === id);
      if (index !== -1) {
        state.vendors[index] = { ...state.vendors[index], ...updatedData };
        saveState("vendors", state.vendors);
      }
    },
    updateSeller(state, action) {
      const { id, updatedData } = action.payload;
      const index = state.sellers.findIndex((seller) => seller.id === id);
      if (index !== -1) {
        state.sellers[index] = { ...state.sellers[index], ...updatedData };
        saveState("sellers", state.sellers);
      }
    },
    updateSuada(state, action) {
      const { id, updatedData } = action.payload;
      const index = state.suadas.findIndex((suada) => suada.id === id);
      if (index !== -1) {
        state.suadas[index] = { ...state.suadas[index], ...updatedData };
        saveState("suadas", state.suadas);
      }
    },

    // DELETE operations
    deleteMember(state, action) {
      const id = action.payload;
      state.members = state.members.filter((member) => member.id !== id);
      saveState("members", state.members);
    },
    deleteBrand(state, action) {
      const id = action.payload;
      state.brands = state.brands.filter((brand) => brand.id !== id);
      saveState("brands", state.brands);
    },
    deleteVendor(state, action) {
      const id = action.payload;
      state.vendors = state.vendors.filter((vendor) => vendor.id !== id);
      saveState("vendors", state.vendors);
    },
    deleteSeller(state, action) {
      const id = action.payload;
      state.sellers = state.sellers.filter((seller) => seller.id !== id);
      saveState("sellers", state.sellers);
    },
    deleteSuada(state, action) {
      const id = action.payload;
      state.suadas = state.suadas.filter((suada) => suada.id !== id);
      saveState("suadas", state.suadas);
    }
  }
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
  deleteMember,
  deleteBrand,
  deleteVendor,
  deleteSeller,
  deleteSuada
} = userSlice.actions;

export default userSlice.reducer;