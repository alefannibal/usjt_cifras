import React from 'react';
import { Route, Navigate } from 'react-router-dom';

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      element={
        authenticated ? (
          <Component />
        ) : (
          <Navigate to="/Login" replace state={{ from: rest.location.pathname }} />
        )
      }
    />
  );
}

export default PrivateRoute;