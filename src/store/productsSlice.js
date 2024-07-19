import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "products",
  initialState: { products: [] },
  reducers: {
    addProducts: (state, action) => {
      state.products = action.payload;
    },
    sortByPrice: (state, action) => {
      const sortOrder = action.payload;
      state.products.sort((a, b) =>
        sortOrder === "asc" ? a.price - b.price : b.price - a.price
      );
    },
  },
});

export const { addProducts, sortByPrice } = productsSlice.actions;
export default productsSlice.reducer;
