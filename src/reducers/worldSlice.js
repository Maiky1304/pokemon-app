import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const worldSlice = createSlice({
  name: "world",
  initialState,
  reducers: {
    addPokemon: (state, action) => {
      const entity = {
        ...action.payload,
        hp: 0,
      };

      state.value = [...state.value, entity];
    },
    updatePokemon: (state, action) => {
      const index = state.value.findIndex(
        (item) => item.url === action.payload.find.url
      );
      state.value[index] = { ...state.value[index], ...action.payload.update };
    },
  },
});

export const { addPokemon, updatePokemon } = worldSlice.actions;
export default worldSlice.reducer;
