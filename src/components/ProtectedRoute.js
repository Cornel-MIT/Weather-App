import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ element: Component }) => {
  const { user } = useContext(AuthContext);

  return user ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;