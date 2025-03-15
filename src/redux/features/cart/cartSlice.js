import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.find(
        (product) => product.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.quantity += Number(action.payload.quantity || 1);
      } else {
        state.push({
          ...action.payload,
          price: Number(action.payload.price || 0), // Price NaN হলে 0 সেট করুন
          quantity: 1,
        });
      }
    },

    removeFromCart: (state, action) => {
      return state.filter((product) => product.id !== action.payload); // Remove Product
    },

    removeAllFromCart: () => {
      return [];
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.find((product) => product.id === id);
      if (product) {
        product.quantity = quantity;
      }
    },

    updateVariant: (state, action) => {
      const { id, variant } = action.payload;
      const existingItem = state.find((item) => item.id === id);
      if (existingItem) {
        existingItem.selectedVariant = variant;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  removeAllFromCart,
  updateQuantity,
  updateVariant,
} = cartSlice.actions;

export default cartSlice.reducer;
