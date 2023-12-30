import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addCategory, removeCategory, setCategories } from '../store/categorySlice';
import axiosApi from '../axiosApi';

const CategoriesList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryType, setNewCategoryType] = useState<'income' | 'expense'>('income');

  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.category.categories);

  const handleAddCategory = async () => {
    const newCategory = {
      name: newCategoryName,
      type: newCategoryType,
    };

    try {
      const response = await axiosApi.post('/categories.json', newCategory);
      const categoryWithId = { ...newCategory, id: response.data.name };
      dispatch(addCategory(categoryWithId));
      setIsModalOpen(false);
      setNewCategoryName('');
      setNewCategoryType('income');
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    const shouldDelete = window.confirm('Вы уверены, что хотите удалить эту категорию?');

    if (shouldDelete) {
      try {
        await axiosApi.delete(`/categories/${id}.json`);
        dispatch(removeCategory(id));
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosApi.get('/categories.json');
        const data = response.data;
        const categoriesArray = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
        dispatch(setCategories(categoriesArray));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    void fetchData();
  }, [dispatch]);

  return (
    <div>
      <h2>Categories</h2>
      <button onClick={() => setIsModalOpen(true)}>Добавить</button>

      {isModalOpen && (
        <div>
          <h3>Добавить новую категорию</h3>
          <label>
            Название:
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
          </label>

          <label>
            Тип:
            <select
              value={newCategoryType}
              onChange={(e) => setNewCategoryType(e.target.value as 'income' | 'expense')}
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </label>

          <button onClick={handleAddCategory}>Добавить</button>
        </div>
      )}

      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {category.name} ({category.type})
            <button onClick={() => handleDeleteCategory(category.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesList;
