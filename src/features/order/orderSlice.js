import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { createOrder } from './orderAPI';

const initialState = {
  orders : [],
  status: 'idle',
};

export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (order) => {
    const response = await createOrder(order);
   
    return response.data;
  }
);

export const counterSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
   
    incrementByAmount: (state, action) => {
      state.orders.push(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      });
  },
});

export const { increment } = counterSlice.actions;


export const selectCount = (state) => state.counter.value;

export default counterSlice.reducer;
