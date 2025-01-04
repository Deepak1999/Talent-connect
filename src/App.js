import './App.css';
import { Route, Routes, HashRouter } from 'react-router-dom';
import Home from './components/Home';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/connect-home" element={<Home />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
