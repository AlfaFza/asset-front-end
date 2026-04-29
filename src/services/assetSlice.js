import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAssets } from "../../services/assetService";

export const fetchAssets = createAsyncThunk(
  "assets/fetchAssets",
  async () => {
    return await getAssets();
  }
);

const assetSlice = createSlice({
  name: "assets",
  initialState: {
    data: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAssets.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      });
  },
});

export default assetSlice.reducer;