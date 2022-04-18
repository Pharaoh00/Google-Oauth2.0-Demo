import './App.css';
import Home from './components/home/home';
import User from './components/user/user';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/profile" element={<User />}></Route>
        </Routes>
    </Router>
  );
}

export default App;
