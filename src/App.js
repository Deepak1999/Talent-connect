import './App.css';
import { Route, Routes, HashRouter } from 'react-router-dom';
import Home from './components/Home/Home';
import Welcome from './components/Home/Welcome';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/connect-home" element={<Home />} />
        <Route path="/" element={<Welcome />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
