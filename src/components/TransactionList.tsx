import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import axiosApi from '../axiosApi';
import { Transaction } from '../store/transactionSlice';

const TransactionList: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosApi.get<{ [key: string]: Transaction }>('/transactions.json');
        const transactionsData = response.data;
        const transactionsArray = Object.values(transactionsData);
        setTransactions(transactionsArray);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    void fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    console.log('Deleting transaction with ID:', id);
  };

  const handleEdit = (id: string) => {
        console.log('Editing transaction with ID:', id);
  };

  if (!transactions || transactions.length === 0) {
    return <div className="alert alert-info">No transactions yet.</div>;
  }

  return (
    <div className="container mt-4">
      <h3>Transaction List</h3>
      {transactions.map((transaction) => (
        <div key={transaction.id} className="list-group mt-3">
          <div className="list-group-item">
            <div>Category: {transaction.category}</div>
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
