// src/components/PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const PrivateRoute = ({ element, ...rest }) => {
  const [cookies] = useCookies(['accessToken']);

  return (
    <Route
      {...rest}
      element={cookies.accessToken ? element : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
