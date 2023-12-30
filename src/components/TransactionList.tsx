import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import axiosApi from '../axiosApi';
import { Transaction } from '../store/transactionSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setCategories } from '../store/categorySlice';

const TransactionList: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.category.categories);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [transactionsResponse, categoriesResponse] = await Promise.all([
          axiosApi.get<{ [key: string]: Transaction }>('/transactions.json'),
          axiosApi.get<{ [key: string]: { name: string; type: 'income' | 'expense' } }>('/categories.json'),
        ]);

        const transactionsData = transactionsResponse.data;
        const transactionsArray = Object.values(transactionsData);
        setTransactions(transactionsArray);

        const categoriesData = categoriesResponse.data;
        const categoriesArray = Object.keys(categoriesData).map((key) => ({
          id: key,
          ...categoriesData[key],
        }));
        dispatch(setCategories(categoriesArray));
      } catch (error) {
        console.error('Error fetching transactions or categories:', error);
      }
    };

    void fetchData();
  }, [dispatch]);

  const getCategoryNameById = (categoryId: string): string => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : 'Unknown Category';
  };

  const handleDelete = async (id: string) => {
    console.log('Deleting transaction with ID:', id);
  };

  const handleEdit = (id: string) => {
    console.log('Editing transaction with ID:', id);
  };

  if (!transactions || transactions.length === 0 || !categories || categories.length === 0) {
    return <div className="alert alert-info">Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h3>Transaction List</h3>
      {transactions.map((transaction) => (
        <div key={transaction.id} className="list-group mt-3">
          <div className="list-group-item">
            <div>Category: {getCategoryNameById(transaction.category)}</div>
            <div>Amount: {transaction.amount} KGS</div>
            <div>Created At: {dayjs(transaction.createdAt).format('DD.MM.YYYY HH:mm:ss')}</div>
            <div>Type: {transaction.type}</div>
            <button className="btn btn-danger" onClick={() => handleDelete(transaction.id)}>
              Delete
            </button>
            <button className="btn btn-primary ms-3" onClick={() => handleEdit(transaction.id)}>
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
