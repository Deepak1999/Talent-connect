import './App.css';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import SingleMessageSent from './components/Pages/SingleMessageSent';
import BulkMessageSent from './components/Pages/BulkMessageSent';
import Login from './components/Login/Login';
import ViewSentMessages from './components/ViewSentMessage/ViewSentMessages';
import Dashboard from './components/Dashboard/Dashboard';

const PrivateRoute = ({ element }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return element;
};

function App() {
  return (
    <BrowserRouter> {/* Change HashRouter to BrowserRouter */}
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} />}
        />
        <Route
          path="/single-message-sent"
          element={<PrivateRoute element={<SingleMessageSent />} />}
        />
        <Route
          path="/bulk-message-sent"
          element={<PrivateRoute element={<BulkMessageSent />} />}
        />
        <Route
          path="/message-history"
          element={<PrivateRoute element={<ViewSentMessages />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
