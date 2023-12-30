import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';

export interface Transaction {
  id: string;
  category: string;
  amount: number;
  createdAt: string;
}

export interface TransactionState {
  transactions: Transaction[];
}

export const fetchTransactions = createAsyncThunk('transaction/fetchTransactions', async () => {
  const response = await axiosApi.get('/transactions.json');
  return response.data as Transaction[];
});

const initialState: TransactionState = {
  transactions: [],
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
    },
    removeTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter((transaction) => transaction.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.transactions = action.payload;
    });
  },
});

export const { addTransaction, removeTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;
