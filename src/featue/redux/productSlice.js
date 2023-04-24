import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductApi } from "../../API/productApi";
const addSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
    isLoading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fecthProduct.pending, (state) => {
      // xử lí logic trước khi qending
    });
    builder.addCase(fecthProduct.fulfilled, (state, actions) => {
      // xử lí logic trước khi fulfilled
      state.product = actions.payload;
      state.isLoading = false;
      return state;
    });
    builder.addCase(fecthProduct.rejected, (state) => {
      // xử lí logic trước khi rejected
    });
  },
});
export const fecthProduct = createAsyncThunk(
  "product/fetchproduct",
  async () => {
    const res = await ProductApi.getAllProduct();
    return res;
  }
);
export const { actions, reducer } = addSlice;
export const { add } = actions;
export default reducer;
