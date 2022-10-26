import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    addItem: (state, action) => {
      if (
        state.value.find((entity) => entity.url === action.payload.url) != null
      ) {
        return;
      }

      state.value = [...state.value, action.payload];
    },
    clearInventory: (state) => {
      state.value = [];
    },
  },
});

export const { addItem, clearInventory } = inventorySlice.actions;
export default inventorySlice.reducer;
