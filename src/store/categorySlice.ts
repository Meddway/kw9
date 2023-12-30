import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Category {
  id: string;
  type: 'income' | 'expense';
  name: string;
}

interface CategoryState {
  categories: Category[];
}

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
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
  },
});

export const { addCategory, removeCategory, setCategories } = categorySlice.actions;

export default categorySlice.reducer;
