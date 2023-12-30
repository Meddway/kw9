import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';

export interface Category {
  id: string;
  type: 'income' | 'expense';
  name: string;
}

export interface CategoryState {
  categories: Category[];
}

export const fetchCategories = createAsyncThunk('category/fetchCategories', async () => {
  const response = await axiosApi.get('/categories.json');
  return response.data as Category[];
});

const initialState: CategoryState = {
  categories: [],
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload);
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter((category) => category.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export const { addCategory, removeCategory } = categorySlice.actions;

export default categorySlice.reducer;
