import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction } from '../store/transactionSlice';
import axiosApi from '../axiosApi';
import { useNavigate } from 'react-router-dom';
import {setCategories} from "../store/categorySlice";

interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
}

const TransactionForm: React.FC = () => {
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [category, setCategory] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories: Category[] = useSelector((state: { category: { categories: Category[] } }) => state.category.categories);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosApi.get('/categories.json');
        const data = response.data;
        const categoriesArray: Category[] = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
        dispatch(setCategories(categoriesArray));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    void fetchCategories();
  }, [dispatch]);

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value as 'income' | 'expense');
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(event.target.value) || 0);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const transaction = {
      type,
      category,
      amount,
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await axiosApi.post('/transactions.json', transaction);
      const newTransaction = { ...transaction, id: response.data.name };
      dispatch(addTransaction(newTransaction));
      setType('income');
      setCategory('');
      setAmount(0);

      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="container mt-4">
      <h3>Add/Edit Transaction</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <select className="form-control" id="type" value={type} onChange={handleTypeChange}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select className="form-control" id="category" value={category} onChange={handleCategoryChange}>
            <option value="" disabled>Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount (KGS):</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
        <button type="button" className="btn btn-danger mt-3 ms-2" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
