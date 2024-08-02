import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import NewLocation from './components/NewLocation';
import Login from './components/Login-SignUp/Login';
import Register from './components/Login-SignUp/Register';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Navigation from './Navigation';
import './App.css';


function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Navigation />
          <div className="container">
            <Routes>
              <Route path="/" element={<ProtectedRoute element={Home} />} />
              <Route path="/new-location" element={<ProtectedRoute element={NewLocation} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App