import { createSlice } from "@reduxjs/toolkit";
import assetsData from "../../mock/assets.json";

const assetSlice = createSlice({
  name: "assets",
  initialState: assetsData,
  reducers: {
    addAsset: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addAsset } = assetSlice.actions;
export default assetSlice.reducer;