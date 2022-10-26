import { configureStore } from "@reduxjs/toolkit";
import pokeApi from "./api/pokeapi";
import inventoryReducer from "./reducers/inventorySlice";
import worldReducer from "./reducers/worldSlice";

export const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
    world: worldReducer,

    /* API */
    [pokeApi.reducerPath]: pokeApi.reducer,
  },
});
