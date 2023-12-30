import React, { useState, useEffect } from 'react';
import axiosApi from '../axiosApi';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  createdAt: string;
}

const TotalBalance: React.FC = () => {
  const [totalBalance, setTotalBalance] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosApi.get<{ [key: string]: Transaction }>('/transactions.json');
        const transactions = response.data;
        const totalAmount = Object.values(transactions).reduce(
          (acc: number, transaction: Transaction) => acc + transaction.amount,
          0
        );
        setTotalBalance(totalAmount);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    void fetchData();
  }, []);

  return (
    <div className="m-3 border border-primary w-25">
      Total Balance: {totalBalance} KGS
    </div>
  );
};

export default TotalBalance;
