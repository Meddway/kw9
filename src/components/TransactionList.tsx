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

  if (!transactions || transactions.length === 0) {
    return <div className="alert alert-info">No transactions yet.</div>;
  }

  return (
    <div className="container mt-4">
      <h3>Transaction List</h3>
      <div className="list-group mt-3">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="list-group-item">
            <div>Category: {transaction.category}</div>
            <div>Amount: {transaction.amount} KGS</div>
            <div>Created At: {dayjs(transaction.createdAt).format('DD.MM.YYYY HH:mm:ss')}</div>
            <div>Type: {transaction.type}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
