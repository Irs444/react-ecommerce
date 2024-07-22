import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts , fetchProductByFilter } from './productAPI';

const initialState = {
  products: [],
  status: 'idle',
  // totalItems:0
};

export const fetchAllProductsAsync  = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    const response = await fetchAllProducts();
   
    return response.data;
  }
);

export const fetchProductByFilterAsync  = createAsyncThunk(
  'product/fetchProductByFilter',
  async ({filter, sort, pagination}) => {
    const response = await fetchProductByFilter(filter, sort, pagination);
   
    return response.data;
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
   
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchProductByFilterAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByFilterAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
        // state.totalItems = action.payload.totalItems;
      });
  },
});

export const { increment } =  productSlice.actions;


export const selectAllProducts = (state) => state.product.products;
// export const selectTotalItems = (state) => state.product.totalItems;

export default productSlice.reducer;
