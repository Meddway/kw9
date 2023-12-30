import Navigation from './components/Navigation';
import TotalBalance from './components/TotalBalance';
import TransactionList from './components/TransactionList';
import {Route, Routes} from "react-router-dom";
import AddTransactionPage from "./pages/AddTransactionPage";
import CategoriesPage from "./pages/CategoriesPage";

function App() {
  return (
    <div>
      <Navigation />
      <TotalBalance />
      <Routes>
        <Route>
          <Route path="/" element={<TransactionList/>} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/add-transaction-page" element={<AddTransactionPage />} />
        </Route>
      </Routes>
    </div>
  );
}
export default App;