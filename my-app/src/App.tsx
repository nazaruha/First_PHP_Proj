import { Link } from 'react-router-dom';
import './App.css';

const App = () => {

  return (
    <>
      <h1 className='text-center'>App.tsx</h1>
      <Link to="/admin/categories">Категорії</Link>
    </>
  );
}

export default App;
