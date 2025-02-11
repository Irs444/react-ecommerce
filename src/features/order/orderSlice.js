import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { createOrder } from './orderAPI';

const initialState = {
  orders : [],
  status: 'idle',
  currentOrder: null
};

// we made need more info of current order

export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (order) => {
    const response = await createOrder(order);
   
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
        state.currentOrder = action.payload 
      });
  },
});

export const { resetOrder } = orderSlice.actions;


export const selecCurrentOrder = (state) => state.order.currentOrder;

export default orderSlice.reducer;
