import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Transaction {
  id: string;
  category: string;
  amount: number;
  createdAt: string;
  type: 'income' | 'expense';
}

export interface TransactionState {
  transactions: Transaction[];
}

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
});

export const {addTransaction, removeTransaction} = transactionSlice.actions;

export default transactionSlice.reducer;
