import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
