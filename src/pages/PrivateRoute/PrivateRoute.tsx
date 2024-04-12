import React from 'react';
import { Route, Navigate, RouteProps } from 'react-router-dom';

const PrivateRoute = ({ element, ...rest }: RouteProps): JSX.Element => {
  const isUserLoggedIn = document.cookie.split(';').some(cookie => cookie.trim().startsWith('user='));

  return (
    <Route
      {...rest}
      element={isUserLoggedIn ? element : <Navigate to="/" replace={true} />}
    />
  );
};

export default PrivateRoute;