import Navigation from './components/Navigation';
import TotalBalance from './components/TotalBalance';
import TransactionList from './components/TransactionList';

function App() {
  return (
    <div>
      <Navigation />
      <TotalBalance />
      <TransactionList/>
    </div>
  );
}
export default App;